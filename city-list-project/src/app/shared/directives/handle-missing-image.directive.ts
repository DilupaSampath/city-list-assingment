import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "img[appHandleMissing]",
})
export class HandleMissingImageDirective {
  constructor(private el: ElementRef) {}

  @HostListener("error")
  private onError() {
    this.el.nativeElement.style.display = "none";
  }
}