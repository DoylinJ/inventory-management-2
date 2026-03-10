import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightReorder]',
  standalone: true
})
export class HighlightReorderDirective implements OnInit {
  @Input() appHighlightReorder: { quantity: number; reorderLevel: number } | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.appHighlightReorder && this.appHighlightReorder.quantity <= this.appHighlightReorder.reorderLevel) {
      this.el.nativeElement.style.backgroundColor = '#ffe5e5';
      this.el.nativeElement.style.borderLeft = '4px solid #d32f2f';
      this.el.nativeElement.style.paddingLeft = '8px';
    }
  }
}
