import { useProgressBar } from '@react-aria/progress'

export interface ProgressBaseProps {
  /**
   * The current value (controlled).
   * @default 0
   */
  value: number
  /**
   * The smallest value allowed for the input.
   * @default 0
   */
  minValue?: number
  /**
   * The largest value allowed for the input.
   * @default 100
   */
  maxValue?: number
}

const ProgressCircle: React.FC<ProgressBaseProps> = (props) => {
  let { progressBarProps } = useProgressBar({
    'isIndeterminate': true,
    'aria-label': 'Progress...',
    ...props,
  })

  const minValue = props.minValue ?? 0
  const maxValue = props.maxValue ?? 100
  const percent = props.value / (maxValue - minValue)

  let center = 64 / 2
  let strokeWidth = 4
  let r = 64 / 2 - strokeWidth
  let c = 2 * r * Math.PI
  let offset = c - (percent ?? 0) * c

  return (
    <svg
      {...(progressBarProps as any)}
      width={64}
      height={64}
      viewBox="0 0 64 64"
      fill="none"
      strokeWidth={strokeWidth}
    >
      <defs>
        <linearGradient id="myGradient">
          <stop offset="0%" stopColor="#E4C0B1" />
          <stop offset="100%" stopColor="#BCB7ED" />
        </linearGradient>
      </defs>
      <circle role="presentation" cx={center} cy={center} r={r} stroke="#494D5B" />
      <circle
        role="presentation"
        cx={center}
        cy={center}
        r={r}
        stroke="url('#myGradient')"
        strokeDasharray={c}
        strokeDashoffset={offset}
      >
        {/* <animateTransform
            attributeName="transform"
            type="rotate"
            begin="0s"
            dur="1s"
            from="0 16 16"
            to="360 16 16"
            repeatCount="indefinite"
          /> */}
      </circle>
    </svg>
  )
}

export { ProgressCircle }
