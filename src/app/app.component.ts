import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';

import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'tdc-graphql';

  public pokemons = [];

  private page = 1;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .query({
        query: gql`
          query {
            pokemons {
              id
              nome
              img
              numeroDex
            }
          }
        `,
      })
      .subscribe((resp: any) => {
        this.pokemons = resp.data.pokemons;
      });
  }

  carregarMais() {
    this.page += 1;

    this.apollo
      .query({
        query: gql`
          query {
            pokemons(page: ${this.page}, size: ${10}) {
              id
              nome
              img
              numeroDex
            }
          }
        `,
      })
      .subscribe((resp: any) => {
        this.pokemons = [...this.pokemons, ...resp.data.pokemons];
        console.log(this.pokemons);
      });
  }
}
