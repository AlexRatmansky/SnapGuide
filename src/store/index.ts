import { Guide } from '/components/Guide';
import { checkSnap } from '/helpers/snapping';
import _ from 'lodash';
import { createStore } from 'redux';

enum Actions {
  TOGGLE_ACTIVE = 'TOGGLE_ACTIVE',
  TOGGLE_VERTICAL_RULE = 'TOGGLE_VERTICAL_RULE',
  TOGGLE_HORIZONTAL_RULE = 'TOGGLE_HORIZONTAL_RULE',
  CLEAR_GUIDES = 'CLEAR_GUIDES',
  UPDATE_MOUSE_POSITION = 'UPDATE_MOUSE_POSITION',
  ARROW_POSITIONING = 'ARROW_POSITIONING',
  TOGGLE_LEGEND = 'TOGGLE_LEGEND',
  UPDATE_SCROLL_POSITION = 'UPDATE_SCROLL_POSITION',
  UPDATE_WINDOW_SIZE = 'UPDATE_WINDOW_SIZE',
}

export const toggleActive = () => ({
  type: Actions.TOGGLE_ACTIVE,
});

export const toggleVerticalRule = () => ({
  type: Actions.TOGGLE_VERTICAL_RULE,
});

export const toggleHorizontalRule = () => ({
  type: Actions.TOGGLE_HORIZONTAL_RULE,
});

export const clearGuides = () => ({
  type: Actions.CLEAR_GUIDES,
});

export const updateMousePosition = eventData => ({
  type: Actions.UPDATE_MOUSE_POSITION,
  eventData,
});

export const arrowPositioning = params => ({
  type: Actions.ARROW_POSITIONING,
  params,
});

export const toggleLegend = () => ({
  type: Actions.TOGGLE_LEGEND,
});

export const updateScrollPosition = scrollPosition => ({
  type: Actions.UPDATE_SCROLL_POSITION,
  scrollPosition,
});

export const updateWindowSize = windowSize => ({
  type: Actions.UPDATE_WINDOW_SIZE,
  windowSize,
});

export interface Store {
  showApp: boolean;
  verticalGuides: Array<Guide>;
  horizontalGuides: Array<Guide>;
  guidesArr: any;
  legendVisible: boolean;
  cursorPos: any;
  crossPos: any;
  elem?: any;
  scrollPosition: any;
  windowSize: any;
  showLegend: boolean;
}

const initialState: Store = {
  showApp: true,

  // verticalGuides: (NODE_ENV === 'development' && CONFIG.VERTICAL_GUIDES) || [],
  // horizontalGuides: (NODE_ENV === 'development' && CONFIG.HORIZONTAL_GUIDES) || [],
  verticalGuides: [],
  horizontalGuides: [],
  guidesArr: [],
  legendVisible: true,
  cursorPos: {
    x: 0,
    y: 0,
  },
  crossPos: {
    x: 0,
    y: 0,
  },
  elem: undefined,
  scrollPosition: {
    scrollTop: window.pageYOffset,
    scrollLeft: window.pageXOffset,
  },
  windowSize: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  showLegend: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.TOGGLE_ACTIVE:
      return Object.assign({}, state, {
        showApp: !state.showApp,
      });

    case Actions.TOGGLE_VERTICAL_RULE:
      let guidesArr = [...state.verticalGuides];
      let currGuidePosition = state.cursorPos.x;
      let currGuidePositionInArray = _.findIndex(guidesArr, guide => guide.position === currGuidePosition);

      if (currGuidePositionInArray === -1) {
        guidesArr.push({ position: currGuidePosition });
        return Object.assign({}, state, {
          verticalGuides: _.sortBy(guidesArr, ['position']),
        });
      } else {
        _.pullAt(guidesArr, currGuidePositionInArray);
      }
      return;

    case Actions.TOGGLE_HORIZONTAL_RULE:
      let guidesArr2 = state.horizontalGuides;
      let currGuidePosition2 = state.cursorPos.y;
      let currGuidePositionInArray2 = _.findIndex(guidesArr2, guide => guide.position === currGuidePosition2);

      if (currGuidePositionInArray2 === -1) {
        guidesArr2.push({ position: currGuidePosition2 });
        return Object.assign({}, state, {
          horizontalGuides: _.sortBy(guidesArr2, ['position']),
        });
      } else {
        _.pullAt(guidesArr2, currGuidePositionInArray2);
      }
      return;

    case Actions.CLEAR_GUIDES:
      return Object.assign({}, state, {
        verticalGuides: [],
        horizontalGuides: [],
      });

    case Actions.UPDATE_MOUSE_POSITION:
      if (action.eventData === undefined) return;

      const currElement = action.eventData.path[0] || undefined;
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = currElement.getBoundingClientRect();
      const elemStyles = window.getComputedStyle(currElement);

      const snapObj = checkSnap({
        elem: currElement,
        elemRect: elemRect,
        bodyRect: bodyRect,
        cursorPosX: action.eventData.pageX,
        cursorPosY: action.eventData.pageY,
        elemStyles: elemStyles,
      });

      const cursorPos = {
        x: Math.round(snapObj.xPos),
        y: Math.round(snapObj.yPos),
      };

      const crossPos = {
        x: Math.round(Math.round(snapObj.xPos) + bodyRect.left),
        y: Math.round(Math.round(snapObj.yPos) + bodyRect.top),
      };

      let left = Math.round(elemRect.left);
      let top = Math.round(elemRect.top);

      const elem = {
        top: top,
        left: left,
        right: left + elemRect.width,
        bottom: top + elemRect.height,
        width: elemRect.width,
        height: elemRect.height,
        style: {
          paddingTop: elemStyles.paddingTop,
          paddingLeft: elemStyles.paddingLeft,
          paddingRight: elemStyles.paddingRight,
          paddingBottom: elemStyles.paddingBottom,
        },
      };

      return Object.assign({}, state, {
        cursorPos,
        crossPos,
        elem,
      });

    case Actions.ARROW_POSITIONING:
      let step = action.params.shiftKey ? 10 : 1;

      switch (action.params.direction) {
        case 'up':
          state.crossPos.y -= step;
          state.cursorPos.y -= step;
          return Object.assign({}, state, {});
        case 'down':
          state.crossPos.y += step;
          state.cursorPos.y += step;
          return Object.assign({}, state, {});
        case 'left':
          state.crossPos.x -= step;
          state.cursorPos.x -= step;
          return Object.assign({}, state, {});
        case 'right':
          state.crossPos.x += step;
          state.cursorPos.x += step;
          return Object.assign({}, state, {});
        default:
          return state;
      }

    case Actions.TOGGLE_LEGEND:
      return Object.assign({}, state, {
        legendVisible: !state.legendVisible,
      });

    case Actions.UPDATE_SCROLL_POSITION:
      return Object.assign({}, state, {
        scrollPosition: Object.assign({}, action.scrollPosition),
      });

    case Actions.UPDATE_WINDOW_SIZE:
      return Object.assign({}, state, {
        windowSize: Object.assign({}, action.windowSize),
      });

    default:
      return state;
  }
};

export const store = createStore(reducer);
