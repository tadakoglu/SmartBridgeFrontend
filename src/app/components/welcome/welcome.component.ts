import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  welcomeMessage: string = '';

  ngOnInit(): void {
    this.welcomeMessage = this.activatedRoute.snapshot.paramMap.get('message') ?? ''
  }

}
