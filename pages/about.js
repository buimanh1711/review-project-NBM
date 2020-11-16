import React, { Component } from 'react';
import Link from 'next/link';

export default class About extends Component {
    constructor(props) {
        super(props);
    }
    static async getInitialProps () {
        console.log('static is running')
        const res = await fetch('https://api.pokemontcg.io/v1/cards?pages=1&pageSize=12')
        const data = await res.json()
        return data;
    }
    render() {
        const { cards }  = this.props;
        console.log(cards)

        return (
            <div>
                {
                    cards.map((item, index) => {
                        return (
                            <Link key={index} href={`/cards?id=${item.id}`}>
                                <img key={ item.id } src={ item.imageUrl } />
                            </Link>
                        )
                    })
                }
            </div>
        )
    }
}