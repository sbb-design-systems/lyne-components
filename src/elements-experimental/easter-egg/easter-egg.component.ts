import { SbbButtonElement } from '@sbb-esta/lyne-elements/button.pure.js';
import { type SbbElementType } from '@sbb-esta/lyne-elements/core.js';
import {
  SbbDialogCloseButtonElement,
  SbbDialogContentElement,
  SbbDialogElement,
  SbbDialogTitleElement,
} from '@sbb-esta/lyne-elements/dialog.pure.js';
import { type CSSResultGroup, html, isServer, nothing, type TemplateResult, unsafeCSS } from 'lit';
import { state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import style from './easter-egg.scss?inline';
import {
  i18nSnakeHighScore,
  i18nSnakeRestart,
  i18nSnakeScore,
  i18nSnakeStart,
  i18nSnakeTitle,
} from './i18n.ts';
import { foodSvgUrls, gridSvgUrl, trainSvgUrls } from './svgs.ts';

// Number of rows and columns on the gameboard (in cells). Cannot be changed.
const ROWS = 16;
// Max cell size (in pixels).
const MAX_CELL_SIZE = 20;
// Interval between updates at the start of the game (in ms).
const START_SPEED = 230;
// Fastest interval between updates (in ms).
const MAX_SPEED = 50;
// Number of food items to eat before the snake speeds up.
const SPEED_UP_EVERY = 3;
// By how much the snake speeds up each step (in ms).
const SPEED_UP_MS = 5;
// Minimum pixel distance to register a swipe.
const SWIPE_THRESHOLD = 30;

// Direction indexes reference the train spritesheet.
// eslint-disable-next-line @typescript-eslint/naming-convention
const Direction = Object.freeze({
  HORIZONTAL: 0,
  VERTICAL: 1,
  SOUTHWEST: 2,
  NORTHWEST: 3,
  NORTHEAST: 4,
  SOUTHEAST: 5,
} as const);
type Direction = (typeof Direction)[keyof typeof Direction];

interface Cell {
  x: number;
  y: number;
  corner: Direction | null;
}

interface Vector {
  x: number;
  y: number;
}

/**
 * A hidden easter egg dialog rendering a canvas-based Snake game.
 *
 * Use the inherited `open()`, `close()` methods and the `isOpen` getter
 * to control the dialog. The dialog can also be triggered from any element
 * via the inherited `trigger` id-reference attribute. Score is exposed via
 * the readonly `score` getter.
 */
export class SbbEasterEggElement extends SbbDialogElement {
  public static override readonly elementName: string = 'sbb-easter-egg';
  public static override elementDependencies: SbbElementType[] = [
    SbbDialogCloseButtonElement,
    SbbDialogTitleElement,
    SbbDialogContentElement,
    SbbButtonElement,
  ];
  public static override styles: CSSResultGroup = [unsafeCSS(style)];

  /** The current game score (number of food items eaten in the current run). */
  public get score(): number {
    return this._score;
  }

  /** The highest score reached in the current dialog session. Reset on close. */
  public get highScore(): number {
    return this._highScore;
  }

  @state() private accessor _score: number = 0;
  @state() private accessor _highScore: number = 0;
  @state() private accessor _gameOver: boolean = false;
  @state() private accessor _started: boolean = false;

  private _canvas: HTMLCanvasElement | null = null;
  private _ctx: CanvasRenderingContext2D | null = null;
  private _cellSize: number = MAX_CELL_SIZE;
  private _snake: Cell[] = [];
  private _currentDir: Vector = { x: 0, y: 0 };
  private _nextDir: Vector = { x: 0, y: 0 };
  private _snakePresence: Uint8Array = new Uint8Array(ROWS * ROWS);
  private _foodPixel: [number, number] = [5, 5];
  private _currentFoodIndex: number = 0;
  private _currentSpeed: number = START_SPEED;
  private _timerId: ReturnType<typeof setInterval> | null = null;
  private _touchStart: Vector = { x: 0, y: 0 };
  private _touchEnd: Vector = { x: 0, y: 0 };
  private _trainImages: HTMLImageElement[] = [];
  private _foodImages: HTMLImageElement[] = [];
  private _gridImage: HTMLImageElement | null = null;
  private _imagesReady: boolean = false;
  private _openAbortController: AbortController | null = null;
  private _prevTailCell: Cell | null = null;
  private _ateFoodThisFrame: boolean = false;
  private _needsFullRedraw: boolean = true;

  public constructor() {
    super();
    this.backdropAction = 'none';
    // Seed a11y label and keep it in sync with the UI language.
    this.accessibilityLabel = i18nSnakeTitle[this.language.current];
    this.language.withHandler(() => {
      this.accessibilityLabel = i18nSnakeTitle[this.language.current];
    });
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopGame();
    this._openAbortController?.abort();
    this._openAbortController = null;
  }

  protected override handleOpening(): void {
    super.handleOpening();
    if (isServer) {
      return;
    }
    this._attachInputListeners();
    if (!this._imagesReady) {
      void this._initGame().then(() => this._resetGame(true));
    }
    void this._focusStartButton();
  }

  protected override handleClosing(): void {
    super.handleClosing();
    this._highScore = 0;
    this._resetGame(true);
    this._openAbortController?.abort();
    this._openAbortController = null;
  }

  private async _initGame(): Promise<void> {
    this._cellSize = Math.min(MAX_CELL_SIZE, Math.max(8, Math.floor(window.innerWidth / ROWS) - 1));

    const canvas = this._canvas;
    if (!canvas) {
      return;
    }
    canvas.width = ROWS * this._cellSize;
    canvas.height = ROWS * this._cellSize;
    this._ctx = canvas.getContext('2d');

    this._gridImage = await this._loadImage(gridSvgUrl);
    this._trainImages = await Promise.all(trainSvgUrls.map((url) => this._loadImage(url)));
    this._foodImages = await Promise.all(foodSvgUrls.map((url) => this._loadImage(url)));
    this._imagesReady = true;
  }

  private async _loadImage(src: string): Promise<HTMLImageElement> {
    const img = new Image();
    img.src = src;
    return img
      .decode()
      .then(() => img)
      .catch(() => img);
  }

  private _attachInputListeners(): void {
    this._openAbortController?.abort();
    this._openAbortController = new AbortController();
    const signal = this._openAbortController.signal;

    document.addEventListener('keydown', (e) => this._onKeydown(e), { signal });

    const canvas = this._canvas;
    if (canvas) {
      canvas.addEventListener('touchstart', (e) => this._onTouchStart(e), {
        signal,
        passive: true,
      });
      canvas.addEventListener('touchend', (e) => this._onTouchEnd(e), {
        signal,
        passive: true,
      });
      canvas.addEventListener('touchmove', (e) => e.preventDefault(), {
        signal,
        passive: false,
      });
    }
  }

  private _onTouchStart(e: TouchEvent): void {
    if (this._gameOver || !this._started) {
      return;
    }
    const t = e.changedTouches[0];
    this._touchStart = { x: t.screenX, y: t.screenY };
  }

  private _onTouchEnd(e: TouchEvent): void {
    if (this._gameOver || !this._started) {
      return;
    }
    const t = e.changedTouches[0];
    this._touchEnd = { x: t.screenX, y: t.screenY };
    this._handleSwipe();
  }

  private _handleSwipe(): void {
    if (this._gameOver || !this._started) {
      return;
    }
    const dx = this._touchEnd.x - this._touchStart.x;
    const dy = this._touchEnd.y - this._touchStart.y;

    if (Math.abs(dx) < SWIPE_THRESHOLD && Math.abs(dy) < SWIPE_THRESHOLD) {
      return;
    }

    const key =
      Math.abs(dx) > Math.abs(dy)
        ? dx > 0
          ? 'ArrowRight'
          : 'ArrowLeft'
        : dy > 0
          ? 'ArrowDown'
          : 'ArrowUp';
    this._applyDirectionKey(key);
  }

  private _onKeydown(e: KeyboardEvent): void {
    this._applyDirectionKey(e.key);
  }

  private _applyDirectionKey(key: string): void {
    if (this._gameOver || !this._started) {
      return;
    }
    const c = key.toLowerCase();
    switch (c) {
      case 'w':
      case 'arrowup':
        this._nextDir = { x: 0, y: -1 };
        break;
      case 's':
      case 'arrowdown':
        this._nextDir = { x: 0, y: 1 };
        break;
      case 'a':
      case 'arrowleft':
        // Cannot start the game going left.
        if (!this._started) {
          return;
        }
        this._nextDir = { x: -1, y: 0 };
        break;
      case 'd':
      case 'arrowright':
        this._nextDir = { x: 1, y: 0 };
        break;
      default:
        return;
    }
    this._started = true;
  }

  private _resetGame(withoutStart?: boolean): void {
    // Reset all reactive state immediately, regardless of whether images are ready.
    this._stopGame();
    this._gameOver = false;
    this._started = false;
    this._score = 0;
    this._currentSpeed = START_SPEED;
    this._currentDir = { x: 1, y: 0 };
    this._nextDir = { x: 1, y: 0 };

    const mid = Math.floor((ROWS / 3) * 2);
    this._snake = [
      { x: mid, y: mid, corner: Direction.HORIZONTAL },
      { x: mid - 1, y: mid, corner: Direction.HORIZONTAL },
      { x: mid - 2, y: mid, corner: Direction.HORIZONTAL },
    ];
    this._snakePresence = new Uint8Array(ROWS * ROWS);
    for (const cell of this._snake) {
      this._snakePresence[this._idx(cell.x, cell.y)] = 1;
    }
    this._foodPixel = [5, 5];
    this._currentFoodIndex = 0;
    this._prevTailCell = null;
    this._ateFoodThisFrame = false;
    this._needsFullRedraw = true;

    // Canvas operations require images — defer only that part if not ready yet.
    if (!this._imagesReady) {
      void this._initGame().then(() => {
        if (!withoutStart) {
          this._startGame();
        } else {
          this._draw();
        }
      });
      return;
    }

    if (!withoutStart) {
      this._startGame();
    } else {
      this._draw();
    }
  }

  // Click handler for the start / restart button: reset if the previous run
  // ended (or hasn't started yet) and start the snake moving immediately.
  private _handleStartClick = (): void => {
    if (isServer) {
      return;
    }
    // _resetGame resets all state synchronously and defers canvas work if images
    // are not yet loaded, so calling it unconditionally is always safe.
    this._resetGame();
    this._started = true;
  };

  private _startGame(): void {
    this._timerId = setInterval(() => this._update(), this._currentSpeed);
  }

  private _stopGame(): void {
    if (this._timerId !== null) {
      clearInterval(this._timerId);
      this._timerId = null;
    }
  }

  private _setGameOver(): void {
    this._stopGame();
    this._gameOver = true;
    if (this._score > this._highScore) {
      this._highScore = this._score;
    }
    void this._focusStartButton();
  }

  // Move focus to the currently rendered start / restart button once the DOM
  // reflects the latest reactive state, so keyboard users can immediately
  // trigger the game on open and on game over.
  private async _focusStartButton(): Promise<void> {
    if (isServer) {
      return;
    }
    await this.updateComplete;
    this.shadowRoot?.querySelector<HTMLElement>('.sbb-easter-egg__overlay sbb-button')?.focus();
  }

  private _updatePoints(): void {
    this._score += 1;
    if (this._score % SPEED_UP_EVERY === 0) {
      this._currentSpeed = Math.max(this._currentSpeed - SPEED_UP_MS, MAX_SPEED);
      this._stopGame();
      this._startGame();
    }
  }

  private _hasCollided(head: Vector): boolean {
    return (
      head.x < 0 ||
      head.x >= ROWS ||
      head.y < 0 ||
      head.y >= ROWS ||
      this._snake.some((part) => part.x === head.x && part.y === head.y)
    );
  }

  private _placeFood(): void {
    const freeCells: number[] = [];
    for (let i = 0; i < this._snakePresence.length; i++) {
      if (this._snakePresence[i] === 0) {
        freeCells.push(i);
      }
    }
    if (!freeCells.length) {
      return;
    }
    const foodIndex = freeCells[Math.floor(Math.random() * freeCells.length)];
    this._foodPixel = [foodIndex % ROWS, Math.floor(foodIndex / ROWS)];
    this._currentFoodIndex = Math.floor(Math.random() * this._foodImages.length);
  }

  private _isReverse(a: Vector, b: Vector): boolean {
    return a.x === -b.x && a.y === -b.y;
  }

  private _idx(x: number, y: number): number {
    return y * ROWS + x;
  }

  private _getSecondSnakeCellDir(): Direction | null {
    const head = this._snake[0];
    const third = this._snake[2];
    if (!third) {
      return null;
    }
    if (head.x === third.x) {
      return Direction.VERTICAL;
    }
    if (head.y === third.y) {
      return Direction.HORIZONTAL;
    }
    const vx = third.x - head.x;
    const vy = third.y - head.y;
    const diagMap: Record<string, [Direction, Direction]> = {
      '1,1': [Direction.SOUTHWEST, Direction.NORTHEAST],
      '-1,1': [Direction.SOUTHEAST, Direction.NORTHWEST],
      '-1,-1': [Direction.NORTHEAST, Direction.SOUTHWEST],
      '1,-1': [Direction.NORTHWEST, Direction.SOUTHEAST],
    };
    const pair = diagMap[`${vx},${vy}`];
    if (!pair) {
      return null;
    }
    return this._currentDir.x !== 0 ? pair[0] : pair[1];
  }

  private _update(): void {
    if (this._started) {
      if (!this._isReverse(this._currentDir, this._nextDir)) {
        this._currentDir = { ...this._nextDir };
      }
      const newHead: Cell = {
        x: this._snake[0].x + this._currentDir.x,
        y: this._snake[0].y + this._currentDir.y,
        corner: null,
      };
      if (this._hasCollided(newHead)) {
        this._setGameOver();
        return;
      }
      this._snakePresence[this._idx(newHead.x, newHead.y)] = 1;
      this._snake.unshift(newHead);
      this._snake[1].corner = this._getSecondSnakeCellDir();

      if (newHead.x === this._foodPixel[0] && newHead.y === this._foodPixel[1]) {
        this._placeFood();
        this._updatePoints();
        this._ateFoodThisFrame = true;
        this._prevTailCell = null;
      } else {
        const tailIdx = this._snake.length - 1;
        this._prevTailCell = { ...this._snake[tailIdx] };
        this._snakePresence[this._idx(this._snake[tailIdx].x, this._snake[tailIdx].y)] = 0;
        this._snake.pop();
        this._ateFoodThisFrame = false;
      }
    }
    this._draw();
  }

  // Restore a single grid tile by copying the corresponding region from the
  // full-board grid image onto the canvas at the same position.
  private _clearTile(x: number, y: number): void {
    if (!this._ctx || !this._gridImage) {
      return;
    }
    const size = this._cellSize;
    this._ctx.clearRect(x * size, y * size, size, size);
    this._ctx.drawImage(this._gridImage, x * 20, y * 20, 20, 20, x * size, y * size, size, size);
  }

  private _draw(): void {
    if (!this._ctx || !this._gridImage) {
      return;
    }
    const size = this._cellSize;

    requestAnimationFrame(() => {
      if (!this._ctx || !this._gridImage) {
        return;
      }

      // Full redraw on game reset / first frame.
      if (this._needsFullRedraw) {
        const boardPx = size * ROWS;
        this._ctx.clearRect(0, 0, boardPx, boardPx);
        this._ctx.drawImage(this._gridImage, 0, 0, boardPx, boardPx);
        this._ctx.drawImage(
          this._foodImages[this._currentFoodIndex],
          this._foodPixel[0] * size,
          this._foodPixel[1] * size,
          size,
          size,
        );

        // Body (excluding head + tail).
        for (let i = 0; i < this._snake.length; i++) {
          const cell = this._snake[i];
          let image = cell.corner !== null ? this._trainImages[cell.corner] : null;
          if (i === 0) {
            image = this._trainImages[this._getTrainHeadDir()];
          }
          if (i === this._snake.length - 1) {
            image = this._trainImages[this._getTrainTailDir(i)];
          }
          if (!image) {
            continue;
          }
          this._ctx.drawImage(image, cell.x * size, cell.y * size, size, size);
        }
        this._needsFullRedraw = false;
        return;
      }

      // Old head (now second cell) → restore tile + draw as body corner.
      const second = this._snake[1];
      this._clearTile(second.x, second.y);
      if (second.corner !== null) {
        this._ctx.drawImage(
          this._trainImages[second.corner],
          second.x * size,
          second.y * size,
          size,
          size,
        );
      }

      if (this._ateFoodThisFrame) {
        // New head (also former food position) → restore tile + draw head.
        const head = this._snake[0];
        this._clearTile(head.x, head.y);
        this._ctx.drawImage(
          this._trainImages[this._getTrainHeadDir()],
          head.x * size,
          head.y * size,
          size,
          size,
        );

        // Draw new food.
        this._ctx.drawImage(
          this._foodImages[this._currentFoodIndex],
          this._foodPixel[0] * size,
          this._foodPixel[1] * size,
          size,
          size,
        );
      } else {
        // Restore old tail position to grid tile.
        if (this._prevTailCell) {
          this._clearTile(this._prevTailCell.x, this._prevTailCell.y);
        }

        // Redraw new tail (former second-to-last cell, now last).
        const tailIndex = this._snake.length - 1;
        const tail = this._snake[tailIndex];
        this._clearTile(tail.x, tail.y);
        this._ctx.drawImage(
          this._trainImages[this._getTrainTailDir(tailIndex)],
          tail.x * size,
          tail.y * size,
          size,
          size,
        );

        // Draw new head.
        const head = this._snake[0];
        this._ctx.drawImage(
          this._trainImages[this._getTrainHeadDir()],
          head.x * size,
          head.y * size,
          size,
          size,
        );
      }
    });
  }

  private _getTrainHeadDir(): number {
    const map: Record<string, number> = {
      '0,1': 8,
      '0,-1': 6,
      '-1,0': 9,
      '1,0': 7,
    };
    return map[`${this._currentDir.x},${this._currentDir.y}`] ?? 7;
  }

  private _getTrainTailDir(tailIndex: number): number {
    const tail = this._snake[tailIndex];
    const prev = this._snake[tailIndex - 1];
    if (tail.x === prev.x) {
      // Vertical.
      return tail.y - prev.y > 0 ? 13 : 11;
    }
    // Horizontal.
    return tail.x - prev.x > 0 ? 10 : 12;
  }

  protected override render(): TemplateResult {
    const lang = this.language.current;
    const showOverlay = !this._started || this._gameOver;
    const buttonLabel = this._gameOver ? i18nSnakeRestart[lang] : i18nSnakeStart[lang];

    return html`
      <div class="sbb-dialog__container">
        <div @animationend=${this.onOverlayAnimationEnd} class="sbb-dialog">
          <div
            @click=${(event: Event) => this.closeOnSbbOverlayCloseClick(event)}
            class="sbb-dialog__wrapper"
          >
            <sbb-dialog-title ?negative=${this.negative}>${i18nSnakeTitle[lang]}</sbb-dialog-title>
            <sbb-dialog-close-button ?negative=${this.negative}></sbb-dialog-close-button>
            <sbb-dialog-content class="sbb-easter-egg__content">
              <div class="sbb-easter-egg__score">
                <span>${i18nSnakeScore[lang]}: ${this._score}</span>
                <span>${i18nSnakeHighScore[lang]}: ${this._highScore}</span>
              </div>
              <div class="sbb-easter-egg__canvas-wrapper">
                <canvas
                  class="sbb-easter-egg__canvas"
                  ${ref((el?: Element) => (this._canvas = (el as HTMLCanvasElement) ?? null))}
                ></canvas>
                ${
                  showOverlay
                    ? html`
                        <div class="sbb-easter-egg__overlay">
                          <sbb-button
                            size="m"
                            @click=${this._handleStartClick}
                            class="sbb-easter-egg__button"
                          >
                            ${buttonLabel}
                          </sbb-button>
                        </div>
                      `
                    : nothing
                }
              </div>
            </sbb-dialog-content>
          </div>
        </div>
      </div>
      <span class="sbb-screen-reader-only" aria-live="polite"></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-easter-egg': SbbEasterEggElement;
  }
}
