import React from 'react';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

export interface BarChartInfoProps {
    data: any[];
    xDataKey: string;
    barDataKey: string;
    barColor?: string;
}

export const BarChartInfo = ({data, xDataKey, barDataKey, barColor}: BarChartInfoProps) => {
    return (
        <ResponsiveContainer height="100%" width='100%'>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey={xDataKey}/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey={barDataKey} fill={barColor}/>
            </BarChart>
        </ResponsiveContainer>
    );
};