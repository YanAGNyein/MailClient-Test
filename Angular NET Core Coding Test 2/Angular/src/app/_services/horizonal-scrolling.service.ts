import { Injectable, QueryList, Renderer2, RendererFactory2 } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Injectable({
  providedIn: 'root',
})
export class HorizonalScrollingService {
  private renderer: Renderer2;
  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  private dataTableUnListener: () => void;

  public addDataTableLiseners(dataTableRefList: DatatableComponent[], scrollableContainerId?: string): void {
    dataTableRefList.forEach((instance) => {
      this.renderer.listen(instance.element, 'click', this.makeTableFocus.bind(this, scrollableContainerId));
      this.renderer.listen(instance.element, 'blur', this.makeTableFocus.bind(this, scrollableContainerId));
    });
  }

  private makeTableFocus(scrollableContainerId: string, $event: Event): void {
    const dataTableClass = 'horizonal-scrolling-ngx-datatable';
    const idElement = document.getElementById(scrollableContainerId);
    const clickTableElements = Array.from(document.getElementsByClassName(dataTableClass));
    if ($event.type === 'click' && clickTableElements.length === 0) {
      this.renderer.addClass($event.currentTarget, dataTableClass);
      if (idElement) {
        this.dataTableUnListener = this.renderer.listen($event.currentTarget, 'wheel', (event: WheelEvent) => {
          document.getElementsByClassName(dataTableClass)[0].scrollBy(event.deltaY, 0);
          event.preventDefault();
          event.stopImmediatePropagation();
          event.stopPropagation();
        });
      } else {
        this.dataTableUnListener = this.renderer.listen($event.currentTarget, 'wheel', (event) => {
          document.getElementsByClassName(dataTableClass)[0].scrollBy(event.deltaY, 0);
        });
      }
    } else {
      clickTableElements.forEach((el) => {
        el.classList.remove(dataTableClass);
      });
      (document.activeElement as HTMLElement).blur();
      this.dataTableUnListener();
    }
  }
}
