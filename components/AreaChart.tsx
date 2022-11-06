import React, { useMemo, useCallback } from 'react'
import { AreaClosed, Line, Bar, LinePath } from '@visx/shape'
import { curveMonotoneX, curveStep } from '@visx/curve'
import { GridRows } from '@visx/grid'
import { scaleTime, scaleLinear } from '@visx/scale'
import { withTooltip, Tooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip'
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip'
import { localPoint } from '@visx/event'
import { LinearGradient } from '@visx/gradient'
import { max, extent, bisector } from 'd3-array'
import { timeFormat } from 'd3-time-format'

import { currencyFormatter } from '../utils/formatters'

export interface AreaChartData {
  date: string
  close: number
}

type TooltipData = AreaChartData

export const background = 'transparent'
export const background2 = 'transparent'
export const accentColor = '#c3b9e4'
export const accentColorDark = '#d6bdc7'
const tooltipStyles = {
  ...defaultStyles,
  background,
  fontFamily: 'mono-regular',
  border: '1px solid white',
  color: 'white',
}

// util
const formatDate = timeFormat("%b %d, '%y")

// accessors
const getDate = (d: AreaChartData) => new Date(d.date)
const getStockValue = (d: AreaChartData) => d.close
const getStockValueFormatted = (d: AreaChartData) => currencyFormatter.format(d.close)

const bisectDate = bisector<AreaChartData, Date>((d) => new Date(d.date)).left

export type AreaProps = {
  width: number
  height: number
  data: Array<AreaChartData>
  margin?: { top: number; right: number; bottom: number; left: number }
}

export const AreaChartExample = withTooltip<AreaProps, TooltipData>(
  ({
    width,
    height,
    data,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  }: AreaProps & WithTooltipProvidedProps<TooltipData>) => {
    if (width < 10) return null

    // bounds
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // scales
    const dateScale = useMemo(
      () =>
        scaleTime({
          range: [margin.left, innerWidth + margin.left],
          domain: extent(data, getDate) as [Date, Date],
        }),
      [data, innerWidth, margin.left],
    )
    const stockValueScale = useMemo(
      () =>
        scaleLinear({
          range: [innerHeight + margin.top, margin.top],
          domain: [0, (max(data, getStockValue) || 0) + innerHeight / 1],
          nice: true,
        }),
      [data, margin.top, innerHeight],
    )

    // tooltip handler
    const handleTooltip = useCallback(
      (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
        const { x } = localPoint(event) || { x: 0 }
        const x0 = dateScale.invert(x)
        const index = bisectDate(data, x0, 1)
        const d0 = data[index - 1]
        const d1 = data[index]
        let d = d0
        if (d1 && getDate(d1)) {
          d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0
        }
        showTooltip({
          tooltipData: d,
          tooltipLeft: x,
          tooltipTop: stockValueScale(getStockValue(d)),
        })
      },
      [dateScale, data, showTooltip, stockValueScale],
    )

    return (
      <div>
        <svg width={width} height={height}>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="url(#area-background-gradient)"
            rx={14}
          />
          <LinearGradient id="area-background-gradient" from={background} to={background2} />
          <LinearGradient
            id="area-gradient"
            from={accentColor}
            fromOpacity={0.1}
            to={'#131419'}
            toOpacity={0.05}
          />
          <LinearGradient
            id="area-gradient-full"
            from={accentColor}
            fromOpacity={1}
            to={accentColorDark}
            toOpacity={1}
          />

          <GridRows
            left={margin.left}
            scale={stockValueScale}
            width={innerWidth}
            strokeDasharray="1,3"
            stroke={accentColor}
            strokeOpacity={0}
            pointerEvents="none"
          />
          {/* <GridColumns
            top={margin.top}
            scale={dateScale}
            height={innerHeight}
            strokeDasharray="1,3"
            stroke={accentColor}
            strokeOpacity={0.2}
            pointerEvents="none"
          /> */}
          <AreaClosed<AreaChartData>
            data={data}
            x={(d) => dateScale(getDate(d)) ?? 0}
            y={(d) => stockValueScale(getStockValue(d)) ?? 0}
            yScale={stockValueScale}
            strokeWidth={1}
            stroke="url(#area-gradient)"
            fill="url(#area-gradient)"
            // curve={curveMonotoneX}
            curve={curveStep}
          />
          <LinePath<AreaChartData>
            // curve={curveMonotoneX}
            curve={curveStep}
            data={data}
            x={(d) => dateScale(getDate(d)) ?? 0}
            y={(d) => stockValueScale(getStockValue(d)) ?? 0}
            stroke="url(#area-gradient-full)"
            strokeWidth={2}
            strokeOpacity={1}
            shapeRendering="geometricPrecision"
          />

          <Bar
            x={margin.left}
            y={margin.top}
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            rx={14}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: margin.top }}
                to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                stroke={accentColorDark}
                strokeWidth={2}
                pointerEvents="none"
                // strokeDasharray="5,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill={accentColorDark}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div>
            <TooltipWithBounds
              key={Math.random()}
              top={Math.min(tooltipTop - 10, innerHeight - 36)}
              left={tooltipLeft + 12}
              style={tooltipStyles}
            >
              {`${getStockValueFormatted(tooltipData)}`}
            </TooltipWithBounds>
            <Tooltip
              top={innerHeight + margin.top - 10}
              left={tooltipLeft}
              style={{
                ...defaultStyles,
                minWidth: 72,
                textAlign: 'center',
                transform: 'translateX(-50%)',
              }}
            >
              {formatDate(getDate(tooltipData))}
            </Tooltip>
          </div>
        )}
      </div>
    )
  },
)
