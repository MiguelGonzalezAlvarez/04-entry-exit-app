import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { EntryExit } from 'src/app/models/entry-exit.model';
import { CardData } from 'src/app/models/statistic.model';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit, OnDestroy {
  // cardDataList: CardData[] = [
  //   {
  //     title: 'default income',
  //     type: 'default-income',
  //     income: 150,
  //     growth: '65% lower growth'
  //   },
  //   {
  //     title: 'delivery income',
  //     type: 'delivery-income',
  //     income: 570,
  //     growth: '15% higher growth'
  //   },
  //   {
  //     title: 'dock income',
  //     type: 'dock-income',
  //     income: 342,
  //     growth: '35% lower growth'
  //   },
  //   {
  //     title: 'balance income',
  //     type: 'balance-income',
  //     income: 200,
  //     growth: '75% lower growth'
  //   }
  // ];

  cardDataList: CardData[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('entryExitInfo').subscribe(({ items }) => this.generateStatistic(items));
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  generateStatistic(items: EntryExit[]): void {
    const entries = items.filter(item => item.type === 'entry');
    const exits = items.filter(item => item.type === 'exit');

    const aggregatedEntriesAmount = entries.reduce((aggregatedAmount, currentEntry) => aggregatedAmount + currentEntry.amount, 0);
    const aggregatedExitsAmount = exits.reduce((aggregatedAmount, currentExit) => aggregatedAmount + currentExit.amount, 0);

    this.cardDataList = this.cardDataList.concat([
      { title: 'entries', type: 'default-income', income: aggregatedEntriesAmount, growth: `${entries.length} entries` },
      { title: 'exits', type: 'default-income', income: aggregatedExitsAmount, growth: `${exits.length} exits` }
    ]);
  }

  getIconFromType(type: string): string {
    const typeToIcon: { [key: string]: string } = {
      'default-income': 'fa fa-money-bill-alt text-success icon-lg',
      'delivery-income': 'fa fa-shipping-fast text-danger icon-lg',
      'balance-income': 'fa fa-balance-scale text-warning icon-lg',
      'dock-income': 'fa fa-anchor text-primary icon-lg',
    };

    return typeToIcon[type];
  }

}
