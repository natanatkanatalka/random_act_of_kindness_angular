import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter((el: any) => {
                console.log(el);
                return ((el.name.toLowerCase().indexOf(input) > -1) || (el.email.toLowerCase().indexOf(input) > -1));
            });
        }
        return value;
    }
}
