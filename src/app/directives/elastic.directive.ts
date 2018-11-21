import { ElementRef, HostListener, Directive } from '@angular/core';

@Directive({
  selector: 'textarea[elastic]'
})
export class ElasticDirective {
    @HostListener('input',['$event.target'])
    onInput(): void {
        this.adjust();
    }

    constructor(public element: ElementRef){}

    ngAfterContentChecked(): void{
        this.adjust();
    }
    adjust(): void{
        this.element.nativeElement.style.overflow = 'hidden';
        this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + "px";
    }

}
