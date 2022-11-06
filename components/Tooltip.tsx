import { TooltipTriggerState, useTooltipTriggerState } from '@react-stately/tooltip'
import { mergeProps } from '@react-aria/utils'
import { useTooltipTrigger, useTooltip } from '@react-aria/tooltip'
import { AriaLabelingProps, DOMProps } from '@react-types/shared'

interface ReactAriaTooltipProps extends DOMProps, AriaLabelingProps {
  isOpen?: boolean
  state?: TooltipTriggerState
}

export interface TooltipProps extends ReactAriaTooltipProps {}

const Tooltip: React.FC<TooltipProps> = ({ state, ...props }) => {
  let { tooltipProps } = useTooltip(props, state)

  return (
    <span
      style={{
        position: 'absolute',
        left: '5px',
        top: '100%',
        marginTop: '10px',
        backgroundColor: 'white',
        color: 'black',
        padding: '5px',
      }}
      {...mergeProps(props, tooltipProps)}
    >
      {props.children}
    </span>
  )
}

/**
 * Usage:
 * 
function Example(props) {
  let state = useTooltipTriggerState(props);
  let ref = React.useRef();

  // Get props for the trigger and its tooltip
  let {triggerProps, tooltipProps} = useTooltipTrigger(props, state, ref);

  return (
    <span style={{position: 'relative'}}>
      <button ref={ref} {...triggerProps}>
        I have a tooltip
      </button>
      {state.isOpen && (
        <Tooltip state={state} {...tooltipProps}>
          And the tooltip tells you more information.
        </Tooltip>
      )}
    </span>
  );
}
 * 
 */

export { Tooltip }
