import Vue from 'vue'
import Vuex from 'vuex'
import { checkSnap } from "../helpers/snapping";
import { CONFIG } from "../config";
import _ from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showApp: true,

    verticalGuides: (DEV_MODE && CONFIG.VERTICAL_GUIDES) || [],
    horizontalGuides: (DEV_MODE && CONFIG.HORIZONTAL_GUIDES) || [],

    legendVisible: true,
    cursorPos: {
      x: 0,
      y: 0
    },
    crossPos: {
      x: 0,
      y: 0
    },
    elem: undefined,

    scrollPosition: {
      scrollTop: window.pageYOffset,
      scrollLeft: window.pageXOffset
    },
    windowSize: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  },
  mutations: {

    toggleActive: (state) => {
      state.showApp = !state.showApp;
    },

    toggleVerticalRule: (state) => {
      let guidesArr = state.verticalGuides;
      let currGuidePosition = state.cursorPos.x;
      let currGuidePositionInArray = _.findIndex(guidesArr, function (guide) {
        return guide.position === currGuidePosition;
      });

      if (currGuidePositionInArray !== -1) {
        _.pullAt(guidesArr, currGuidePositionInArray);
      } else {
        guidesArr.push({ position: currGuidePosition });
        state.verticalGuides = _.sortBy(guidesArr, [ 'position' ]);
      }
    },
    toggleHorizontalRule: (state) => {
      let guidesArr = state.horizontalGuides;
      let currGuidePosition = state.cursorPos.y;
      let currGuidePositionInArray = _.findIndex(guidesArr, function (guide) {
        return guide.position === currGuidePosition;
      });

      if (currGuidePositionInArray !== -1) {
        _.pullAt(guidesArr, currGuidePositionInArray);
      } else {
        guidesArr.push({ position: currGuidePosition });
        state.horizontalGuides = _.sortBy(guidesArr, [ 'position' ]);
      }
    },

    clearGuides: (state) => {
      state.verticalGuides = [];
      state.horizontalGuides = [];
    },

    updateMousePosition: (state, eventData) => {
      if (eventData === undefined) return;

      const currElement = eventData.path[ 0 ] || undefined;
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = currElement.getBoundingClientRect();
      const elemStyles = window.getComputedStyle(currElement);

      const snapObj = checkSnap({
        elem: currElement,
        elemRect: elemRect,
        bodyRect: bodyRect,
        cursorPosX: eventData.pageX,
        cursorPosY: eventData.pageY,
        elemStyles: elemStyles
      });

      state.cursorPos = {
        x: Math.round(snapObj.xPos),
        y: Math.round(snapObj.yPos)
      };

      state.crossPos = {
        x: Math.round(Math.round(snapObj.xPos) + bodyRect.left),
        y: Math.round(Math.round(snapObj.yPos) + bodyRect.top)
      };

      let left = Math.round(elemRect.left - bodyRect.left);
      let top = Math.round(elemRect.top - bodyRect.top);

      state.elem = {
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
          paddingBottom: elemStyles.paddingBottom
        }
      };
    },

    arrowPositioning: (state, params) => {
        let step = params.shiftKey ? 10 : 1;

        switch (params.direction) {
          case 'up':
            state.crossPos.y -= step;
            state.cursorPos.y -= step;
            break;
          case 'down':
            state.crossPos.y += step;
            state.cursorPos.y += step;
            break;
          case 'left':
            state.crossPos.x -= step;
            state.cursorPos.x -= step;
            break;
          case 'right':
            state.crossPos.x += step;
            state.cursorPos.x += step;
            break;
        }
    },

    toggleLegend: (state) => {
      state.legendVisible = !state.legendVisible;
    },

    updateScrollPosition: (state, scrollPosition) => {
      state.scrollPosition = Object.assign({}, scrollPosition);
    },

    updateWindowSize: (state, windowSize) => {
      state.windowSize = Object.assign({}, windowSize);
    }
  },
})