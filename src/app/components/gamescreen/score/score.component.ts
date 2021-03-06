import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {QuestionService} from '../../../services/question/question.service';
import {Router} from '@angular/router';
import { ScoreupdateService } from '../../../services/scoreupdate/scoreupdate.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit, OnChanges {

  @Input() time = 0;
  @Input() score = 0;

  public mins = '';
  public secs = '';
  public user = null;

  public finalScore = 0;
  public max = 0;

  constructor(protected localStorage: LocalStorage,
              private questionservice: QuestionService,
              private router: Router,
              private scoreupdate: ScoreupdateService
              ) { }

  ngOnInit() {

    this.max = this.scoreupdate.MAX_SCORE;

    this.localStorage.getItem('currentUser').subscribe((user) => {
      this.user = user;
    });

    this.finalScore = (100 - ((this.score / this.max) * 100));

  }

  ngOnChanges() {
    this.finalScore = (100 - ((this.score / this.max) * 100));
    this.scoreupdate.score = ((this.score / this.max) * 100);

    if (this.finalScore <= 0) {
      setTimeout(() => {
        this.router.navigateByUrl('/finish');
      }, 2000);

    }

     this.mins = (Math.floor(this.time / 60)).toString().padStart(2, '0');
     this.secs = (this.time % 60).toString().padStart(2, '0');
  }

  voteUs(): void {
    window.open('http://www.angularattack.com/entries/169-nullpointer/vote', '_blank');
  }

  exitGame(): void {
    this.router.navigateByUrl('/start');
  }

}
