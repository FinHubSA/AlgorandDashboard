import React, { Component } from 'react';
import draw from './vis';

export default class SankeyChart extends Component {

    constructor(props) {
        super(props);
     
        this.state = {
            data: [
                {
                    "account_type":"Banks",
                    "instrument_type":"Deposits",
                    "counter_party":"Households",
                    "asset": false,
                    'value': 1000000
                },
                {
                    "account_type":"Banks",
                    "instrument_type":"Deposits",
                    "counter_party":"Firms",
                    "asset": false,
                    'value': 1500000
                },
                {
                    "account_type":"Banks",
                    "instrument_type":"Reserves",
                    "counter_party":"Central Bank",
                    "asset": true,
                    'value': 500000
                },
                {
                    "account_type":"Banks",
                    "instrument_type":"Loans and Bonds",
                    "counter_party":"Firms",
                    "asset": true,
                    'value': 2000000
                },
                
                {
                    "account_type":"Households",
                    "instrument_type":"Bank Notes",
                    "counter_party":"Central Bank",
                    "asset": false,
                    'value': 1000000
                },
                {
                    "account_type":"Households",
                    "instrument_type":"Deposits",
                    "counter_party":"Banks",
                    "asset": true,
                    'value': 1000000
                },


                {
                    "account_type":"Firms",
                    "instrument_type":"Loans and Bonds",
                    "counter_party":"Banks",
                    "asset": false,
                    'value': 1500000
                },
                {
                    "account_type":"Firms",
                    "instrument_type":"Deposits",
                    "counter_party":"Banks",
                    "asset": true,
                    'value': 1500000
                },


                {
                    "account_type":"Central Bank",
                    "instrument_type":"Reserves",
                    "counter_party":"Banks",
                    "asset": false,
                    'value': 500000
                },
                {
                    "account_type":"Central Bank",
                    "instrument_type":"Bank Notes",
                    "counter_party":"Households",
                    "asset": true,
                    'value': 1000000
                }
            ],
            config: {
                "essential" : {
                    "colour_palette":
                    [
                        "#206095",
                        "#118C7B",
                        "#003C57",
                        "#A8BD3A",
                        "#27A0CC"
                    ],
                    "source_label":"2001",
                    "target_label":"2012",
                    "unit_preffix": "£",
                    "unit_suffix": "million",
                    "format": ",.0f",
                    "alt_text": "Use title from tracker here to provide an explanation of chart",
                    "source":"ONS ...."
                },
                "optional" : {
                    "margin_sm": [10, 10, 10, 10],
                    "margin_md": [10, 10, 10, 10],
                    "margin_lg": [10, 10, 10, 10],
                    "aspectRatio_sm" : [7,3],
                    "aspectRatio_md" : [7,4],
                    "aspectRatio_lg" : [7,5],
                    "mobileBreakpoint" : 400
                }
            }
        }
    }

    componentDidMount() {
        this.props.data = this.data
        this.props.config = this.config
        draw(this.props);
    }

    componentDidUpdate(preProps) {
        draw(this.props);
    }

    render() {
        return (
            <div id='sankeychart' className='vis-sankeychart'/>
        )
    }
}
