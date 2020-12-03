import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  //#region Properties

  //#endregion

  //#region Accessors

  //#endregion

  //#region Constructor

  public constructor(protected titleService: Title) {
  }

  //#endregion

  //#region Methods

  public ngOnInit(): void {
    this.titleService.setTitle('CMS UI');
  }

  //#endregion
}
