import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MapsService } from './maps.service';

import { environment } from 'src/environments/environment';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'maps',
  templateUrl: './maps.component.html'
})

export class MapsComponent implements OnInit {

  public loadData: Boolean = false;
  public loadDataAnimate: Boolean = false;

  public formMaps: FormGroup;
  public getAddress: Object = null;

  public loadMaps: Boolean = false;
  public loadMapsAnimate: Boolean = false;

  public imageMaps: any;
  public imageLoad: Boolean = false;

  public configMaps: any = environment.maps;

  constructor(
    private mapsService: MapsService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.initForm();

  }

  public initForm(): void {

    this.formMaps = this.fb.group({
      field: this.fb.control(null, [Validators.required])
    });

  }

  public loadDataTransition(status: Boolean): void {

    if (status) {

      this.loadData = status;

    } else {

      setTimeout(() => {

        this.loadData = status;

      }, 700);

    }

    this.loadDataAnimate = status;

  }

  public loadMapsTransition(status: Boolean): void {

    if (status) {

      this.loadMaps = status;

    } else {

      setTimeout(() => {

        this.loadMaps = status;

      }, 700);

    }

    this.loadMapsAnimate = status;

  }

  public getAddressMaps(): void {

    this.searchAddress().subscribe(
      (resp) => {
        console.log(resp)
      },
      (error: any) => {

        this.getAddress = null;
        
        this.loadMapsTransition(true);

        this.loadDataTransition(false);

      }
    );

  }

  public searchAddress<T>(): Observable<T> {

    const postalCode: string = this.formMaps.get('field').value;

    this.configMaps.center = postalCode;

    this.loadDataTransition(true);

    return forkJoin(
      [
        this.mapsService.getAddress(postalCode),
        this.mapsService.getMaps(this.configMaps)
      ],
      (address: any, maps: any) => {

        
        this.loadMapsTransition(true);

        if (address.erro) {

          this.getAddress = null;

        } else {

          this.getAddress = address;
          this.getMaps(maps);

        }

        this.loadDataTransition(false);

        return { address, maps };

      }
    );

    // this.mapsService.getAddress(postalCode).subscribe(
    //   (resp: any) => {

    //     if (resp.erro) {
    //       this.getAddress = null;
    //     } else {

    //       this.getAddress = resp;
    //       this.configMaps.center = postalCode;

    //       this.mapsService.getMaps(this.configMaps).subscribe(
    //         (maps: any) => {
    //           this.getMaps(maps);
    //         },
    //         (error: any) => {
    //           console.log(error);
    //         }
    //       );

    //     }

    //     
    this.loadMapsTransition(true);

    //     this.loadDataTransition(false);

    //   },
    //   (error: any) => {

    //     this.getAddress = null;
    //     
    this.loadMapsTransition(true);

    //     this.loadDataTransition(false);

    //   }
    // );

  }

  public getMaps(maps: Blob): void {

    const readerMaps = new FileReader();

    readerMaps.addEventListener("load", () => {

      this.imageMaps = readerMaps.result;
      this.imageLoad = true;

    });

    if (maps) {
      readerMaps.readAsDataURL(maps);
    }

  }

}
