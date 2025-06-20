import { ReactComposite } from 'ridgejs'

export default ({ visible }) => {
  return (
    <div
      className='user-panel' style={{
        display: visible ? '' : 'none'
      }}
    >
      <ReactComposite app='ridge-editor-app' path='/user/UserPanel' />
    </div>
  )
}
