import { Component, OnDestroy, OnInit } from '@angular/core';
import { retry,take, map, filter } from 'rxjs/operators';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

public intervalSubs : Subscription;

  constructor() { 
/*
 this.retornaObservable().pipe(
   retry(2)
 ).subscribe(
   valor => console.log('Subs:', valor), 
    (err) => console.warn('Error:', err),
    () => console.info('Obs terminado')
    
 ); */
 this.intervalSubs = this.retornaIntervalo().subscribe(console.log)


}
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

retornaIntervalo(): Observable<number>{

  return  interval(500)
                      .pipe(
                        map(valor => valor + 1 ),
                        filter(  valor => (valor % 2 === 0 )? true:false),
                      //  take(4)
                      );



}

  retornaObservable(): Observable<number>{
    let i = 0;
    return  new Observable<number>( observer =>{


      const intervalo = setInterval( () =>{
         
      i++;
      observer.next(i);
    
      if (i === 5) {
        clearInterval(intervalo);
        observer.complete();
      }
          
     if (i === 2 ) {
       observer.error('i llego al valor de error');
     }
    
      },1000)
    
     });

  }

}
