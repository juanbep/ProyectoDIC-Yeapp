import { Injectable } from '@angular/core';

declare var document: any;

@Injectable({
  providedIn: 'root'
})
export class CallServiceService {
  loadScripts(scriptUrls: string[]): Promise<void[]> {
    const loadPromises: Promise<void>[] = [];
    scriptUrls.forEach(src => {
      const loadPromise = new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
      loadPromises.push(loadPromise);
    });
    return Promise.all(loadPromises);
  }
}
