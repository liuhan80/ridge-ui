import RidgeContext, { VERSION } from './RidgeContext.js'
import { withRidgePlugin } from './framework/withRidgePlugin.js'
import Composite from './node/Composite.js'
import Element from './node/Element.js'
import ValtioStore from './store/ValtioStore.js'
import ReactComposite from './framework/ReactComposite.jsx'
import { convertToValidVariableName } from './utils/string.js'
const ELEMENT_SCHEMA_URL = 'https://ridge-ui.com/schemas/element'
const COMPOSITE_SCHEMA_URL = 'https://ridge-ui.com/schemas/composite'
window.Ridge = RidgeContext

window.ridgejs = {
  VERSION,
  ReactComposite,
  withRidgePlugin
}

export default RidgeContext

export {
  RidgeContext,
  withRidgePlugin,
  VERSION,
  ELEMENT_SCHEMA_URL,
  COMPOSITE_SCHEMA_URL,
  Composite,
  Element,
  ValtioStore,
  ReactComposite,
  convertToValidVariableName
}
