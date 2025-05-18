import {Pie, PieChart, ResponsiveContainer, Sector} from "recharts";
import {useState} from "react";

const renderActiveShape = (renderPercent) => (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value, name } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{value}</text>
            {renderPercent && (
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {`(${(percent * 100).toFixed(2)}%)`}
                </text>
            )}
        </g>
    );
};

export default function DashboardPieChart({title, renderPercent, dataKey, nameKey, data}) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            <h4 className="text-center">{title}</h4>
            <ResponsiveContainer height={300}>
                <PieChart>
                    <Pie data={data} dataKey={dataKey} nameKey={nameKey} fill="var(--orange)"
                         innerRadius={80} paddingAngle={5} outerRadius={100}
                         animationBegin={100} animationDuration={500}
                         activeIndex={activeIndex} activeShape={renderActiveShape(renderPercent)}
                         onMouseEnter={(_, index) => setActiveIndex(index)}/>
                </PieChart>
            </ResponsiveContainer>
        </>
    )
}
