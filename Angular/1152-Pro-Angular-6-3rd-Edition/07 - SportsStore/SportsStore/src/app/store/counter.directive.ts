import {
    Directive, 
    ViewContainerRef, 
    TemplateRef,
    Input,
    Attribute, 
    SimpleChanges
} from '@angular/core'

@Directive({
    selector:'[counterOf]'
})
export class CounterDirective {
    @Input('counterOf')
    counter: number;
    
    constructor(
        private conatainer: ViewContainerRef,
        private template: TemplateRef<Object>
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        this.conatainer.clear();
        for (let i = 0; i < this.counter; i++) {
            this.conatainer.createEmbeddedView(this.template, new CounterDirectiveContext(i+1));
        }
    }
}

class CounterDirectiveContext {
    constructor(public $implicit:any) {}
}