import {Component, OnInit} from '@angular/core';
import {Star} from 'src/app/shared/models/star.model';
import {IsGameOverService} from 'src/app/shared/services/is-game-over.service';

@Component({
  templateUrl: './results-dialog.component.html',
  styleUrls: ['./results-dialog.component.scss']
})
export class ResultsDialogComponent implements OnInit {
  protected stars: Star[] = [
    {isVisible: false, image: 'star-frame'},
    {isVisible: false, image: 'star-frame'},
    {isVisible: false, image: 'star-frame'},
    {isVisible: false, image: 'star-frame'},
    {isVisible: false, image: 'star-frame'}
  ];
  image: string | null = null;
  protected finalGrade: number;
  description: string;

  constructor(private isGameOverService: IsGameOverService) {}

  ngOnInit() {
    this.finalGrade = this.calculateFinalGrade();
    this.createStars(this.finalGrade);
    this.setSummary(this.finalGrade);
    this.displayStarsSequentially();
  }

  displayStarsSequentially() {
    let delay = 1500;
    for (let i = 0; i < this.stars.length; i++) {
      setTimeout(() => {
        this.stars[i].isVisible = true;
      }, delay);
      delay += 500;
    }
  }

  private createStars(finalGrade: number) {
    const stars = Math.floor(finalGrade / 20);

    for (let i = 0; i < stars; i++) {
      this.stars[i].image = 'israel-star';
    }

    const remainder = finalGrade % 20;
    const halfStar = remainder >= 10 && remainder < 20;

    if (halfStar) {
      this.stars[stars].image = 'half-star-israel';
    }
  }

  private calculateFinalGrade() {
    const maxGrade = 14;
    const grade = this.isGameOverService.getCurrentGrade();

    return Math.round((grade * 100 / maxGrade) / 10) * 10;
  }

  private setSummary(finalGrade: number) {
    const gradeRanges = [
      { min: 0, max: 20, image: '0_stars.jpg', description: 'נפילה כואבת. לא נורא, אולי בפעם הבאה' },
      { min: 21, max: 35, image: '1_stars.jpg', description: 'אתה ומפות לא חברים טובים. בהצלחה בפעם הבאה' },
      { min: 36, max: 50, image: '2_stars.jpg', description: 'לא רע. המשך להתאמן' },
      { min: 51, max: 65, image: '3_stars.jpg', description: 'אתה מדריך טיולים חובב. יש לך לאן לשאוף' },
      { min: 66, max: 85, image: '4_stars.jpg', description: 'אתה מורה דרך מומחה!!' },
      { min: 86, max: 100, image: '5_stars.jpg', description: 'אתה פרופסור לידיעת הארץ!!!' }
    ];

    for (const range of gradeRanges) {
      if (finalGrade >= range.min && finalGrade <= range.max) {
        this.image = range.image;
        this.description = range.description;
        break;
      }
    }
  }
}
