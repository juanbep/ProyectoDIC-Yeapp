import { Component, OnInit } from '@angular/core';
import { CallServiceService } from '../call-service.service';
declare var engageDigitalClickToCallConfig: any;
@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css']
})
export class CallComponent implements OnInit {

  toggleChat(): void {
    const chatBox: HTMLElement | null = document.querySelector('.chat-box');
    if (chatBox) {
      chatBox.classList.toggle('minimized');
    }
  }

  constructor(private scriptLoaderService: CallServiceService) {}

  ngOnInit(): void {
    this.scriptLoaderService.loadScripts([
      '../assets/js/engageDigitalClicktoCallConfig.js',
      '../assets/js/engage-digital-click-to-call.js'
    ]).then(() => {
      // Ambos scripts se han cargado correctamente
      if (typeof engageDigitalClickToCallConfig !== 'undefined') {
        // Utiliza las configuraciones de engageDigitalClickToCallConfig aquí
        console.log(engageDigitalClickToCallConfig);
        // También puedes usar las funciones o variables del otro script aquí
        // Por ejemplo: engageDigitalClickToCall.init();
      } else {
        console.error('engageDigitalClickToCallConfig no está definido en el script cargado.');
      }
    }).catch(error => {
      console.error('Error al cargar los scripts:', error);
    });
  }

}
