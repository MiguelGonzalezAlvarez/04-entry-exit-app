import { Component } from '@angular/core';

interface CardData {
  title: string;
  type: string
  income: number;
  growth: string;
}

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent {
  cardDataList: CardData[] = [
    {
      title: 'default income',
      type: 'default-income',
      income: 150,
      growth: '65% lower growth'
    },
    {
      title: 'delivery income',
      type: 'delivery-income',
      income: 570,
      growth: '15% higher growth'
    },
    {
      title: 'dock income',
      type: 'dock-income',
      income: 342,
      growth: '35% lower growth'
    },
    {
      title: 'balance income',
      type: 'balance-income',
      income: 200,
      growth: '75% lower growth'
    }
  ];

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
