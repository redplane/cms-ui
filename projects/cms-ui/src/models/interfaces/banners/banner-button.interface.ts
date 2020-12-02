import {HtmlContent} from '../../html-content';

export interface IBannerButton {

  //#region Properties

  content: string | HtmlContent;

  // Handler for checking whether button is active or not.
  activeHandler?: () => boolean;

  // Handler for handle click event.
  // bannerId: Id of banner that action button is triggered.
  // close: Handler for triggering next banner to be displayed.
  clickHandler?: (bannerId: string, close: () => void) => void;

  //#endregion

}
