import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Ad} from '../../types/ad.model';

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  private mockAds: Ad[] = [
    {
      id: "1",
      title: "Student Discount Banking",
      description: "Special rates for international students",
      imageUrl: "/ads/ad-1.jpg",
      link: "#",
    },
    {
      id: "2",
      title: "Currency Exchange Deals",
      description: "Best rates guaranteed for your transfers",
      imageUrl: "/ads/ad-2.jpg",
      link: "#",
    },
    {
      id: "3",
      title: "Education Insurance",
      description: "Protect your child's future abroad",
      imageUrl: "/ads/ad-3.jpg",
      link: "#",
    },
  ]

  getAds(): Observable<Ad[]> {
    return of(this.mockAds)
  }
}
