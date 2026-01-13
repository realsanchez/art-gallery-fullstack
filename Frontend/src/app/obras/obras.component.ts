import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObrasService } from '../services/obras.service';

@Component({
  selector: 'app-obras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.css'],
})
export class ObrasComponent implements OnInit {

  obras1: any[] = [];
  obras2: any[] = [];
  obras3: any[] = [];

  constructor(private obrasService: ObrasService) {}

 ngOnInit() {
  // Traer obras1
  this.obrasService.getObras().subscribe((res: any) => {
    this.obras1 = res.results;
  });

  // Traer obras2
  this.obrasService.getObras().subscribe((res: any) => {
    this.obras2 = res.results;
    console.log(this.obras2);
  });

  // Traer obras3
  this.obrasService.getObras().subscribe((res: any) => {
    this.obras3 = res.results;
  });
}
}
