import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../service/leader.service';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animation';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': "true", 
    'style': 'display: block'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {
  
  leaders!: Leader[];
  constructor(private leaderservice: LeaderService) { }

  ngOnInit() {
    this.leaders = this.leaderservice.getLeaders();
    this.checkOutput();
  }

  checkOutput() {
    console.log(this.leaders);
  }

}
