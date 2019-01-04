import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-html-web-worker',
  templateUrl: './html-web-worker.component.html',
  styleUrls: ['./html-web-worker.component.scss']
})
export class HtmlWebWorkerComponent implements OnInit {

  private w: Worker = null;

  constructor() { }

  ngOnInit() {
  }



  startWorker() {
    if (typeof (Worker) !== 'undefined') {
      if (typeof (this.w) === 'undefined' || this.w === null) {
        this.w = new Worker('assets/scripts/js/workerDemo.js');
      }
      this.w.onmessage = function (event) {
        document.getElementById('result').innerHTML = event.data;
      };
    } else {
      document.getElementById('result').innerHTML = 'Sorry, your browser does not support Web Workers...';
    }
  }

  stopWorker() {
    this.w.terminate();
    this.w = undefined;
  }

}
