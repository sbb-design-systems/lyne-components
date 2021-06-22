import {
  Component,
  h,
  Prop
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'lyne-footer.scss',
  tag: 'lyne-footer'
})

export class LyneFooter {

  @Prop() public footertitle: string;

  public render(): any {
    return [
      <h1 class='visuallyhidden'>{this.footertitle}</h1>,
      <div role='contentinfo'>
        <lyne-footer-columns>
          <lyne-footer-column>
            <lyne-footer-column-title columntitle='Kontakt'></lyne-footer-column-title>
            <lyne-footer-column-rte>
              <p>Haben Sie Fragen? Wir helfen Ihnen gerne. Bitte lesen Sie auch unsere Erklärung zum <a href='/de/meta/legallines/datenschutz.html'>Datenschutz</a>.</p>
            </lyne-footer-column-rte>
          </lyne-footer-column>
          <lyne-footer-column>
            <lyne-footer-column-title columntitle='Bahnverkehrsinformationen'></lyne-footer-column-title>
            <lyne-footer-column-rte>
              <p>Informationen über die aktuelle Betriebslage und Störungen auf dem Schweizer Schienennetz und über wichtige Behinderungen und Streiks im Ausland.</p>
            </lyne-footer-column-rte>
          </lyne-footer-column>
          <lyne-footer-column>
            <lyne-footer-column-title columntitle='Newsletter & Social Media'></lyne-footer-column-title>
            <lyne-footer-column-rte>
              <p>Jeden Monat über Angebote und Neuigkeiten informiert sein.</p>
            </lyne-footer-column-rte>
            <lyne-footer-column-link-list>
              <lyne-footer-column-link-list-item external='true' label='Facebook' href='https://company.sbb.ch/de/home.html'></lyne-footer-column-link-list-item>
              <lyne-footer-column-link-list-item external='true' label='Twitter' href='https://company.sbb.ch/de/immobilien.html'></lyne-footer-column-link-list-item>
              <lyne-footer-column-link-list-item external='true' label='YouTube' href='http://company.sbb.ch/de/home.html'></lyne-footer-column-link-list-item>
              <lyne-footer-column-link-list-item external='true' label='Instagram' href='http://company.sbb.ch/de/home.html'></lyne-footer-column-link-list-item>
              <lyne-footer-column-link-list-item label='SBB News' href='http://company.sbb.ch/de/home.html'></lyne-footer-column-link-list-item>
              <lyne-footer-column-link-list-item label='SBB Community' href='http://company.sbb.ch/de/home.html'></lyne-footer-column-link-list-item>
            </lyne-footer-column-link-list>
          </lyne-footer-column>
          <lyne-footer-column>
            <lyne-footer-column-title columntitle='Über die SBB'></lyne-footer-column-title>
            <lyne-footer-column-link-list>
              <lyne-footer-column-link-list-item label='Unternehmen' href='https://company.sbb.ch/de/home.html'></lyne-footer-column-link-list-item>
              <lyne-footer-column-link-list-item label='SBB Immobilien' href='https://company.sbb.ch/de/immobilien.html'></lyne-footer-column-link-list-item>
              <lyne-footer-column-link-list-item label='SBB Cargo' href='http://company.sbb.ch/de/home.html'></lyne-footer-column-link-list-item>
              <lyne-footer-column-link-list-item label='Jobs & Karriere' href='http://company.sbb.ch/de/home.html'></lyne-footer-column-link-list-item>
              <lyne-footer-column-link-list-item label='Medien & Dossiers' href='http://company.sbb.ch/de/home.html'></lyne-footer-column-link-list-item>
            </lyne-footer-column-link-list>
          </lyne-footer-column>
        </lyne-footer-columns>
      </div>
    ];
  }
}
