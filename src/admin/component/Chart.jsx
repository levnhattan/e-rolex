import React from 'react'
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";


const data = [
    { name: "Tháng 8", rolex: 10, samsung: 0, royal: 23 },
    { name: "Tháng 9", rolex: 5, samsung: 5, royal: 15 },
    { name: "Tháng 10", rolex: 8, samsung: 12, royal: 14 },
    { name: "Tháng 11", rolex: 12, samsung: 7, royal: 20 },
    { name: "Tháng 12", rolex: 22, samsung: 19, royal: 17 },
];

const Chart = () => {

    return (
        <div className="row">
            <div className="col-xl-12">
                <LineChart width={900} height={300} data={data}>
                    <Line type="monotone" dataKey="rolex" stroke="#2196F3" strokeWidth={3} />
                    <Line
                        type="monotone"
                        dataKey="samsung"
                        stroke="#F44236"
                        strokeWidth={3}
                    />
                    <Line type="monotone" dataKey="royal" stroke="#FFCA29" strokeWidth={3} />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                </LineChart>
            </div>
        </div>
    );

}

export default Chart