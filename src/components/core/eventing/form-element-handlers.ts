import { HandlerAspect } from './handler-repository';

/**
 * Prevents scrolling from pressing Space
 * @param event The origin event.
 */
function preventScrollOnSpacebarPress(event: KeyboardEvent): void {
  if (event.key === ' ') {
    event.preventDefault();
  }
}

/**
 * Handler to prevent scrolling on space bar click
 */
export const formElementHandlerAspect: HandlerAspect = ({ host, signal }) => {
  host.addEventListener('keydown', preventScrollOnSpacebarPress, { signal });
};
