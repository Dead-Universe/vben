import * as echarts from 'echarts/core';

import {
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  PictorialBarChart,
  RadarChart,
  ScatterChart,
  BoxplotChart,
  ParallelChart,
} from 'echarts/charts';

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  LegendComponent,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
  DatasetComponent,
  TransformComponent,
  BrushComponent,
} from 'echarts/components';

import { SVGRenderer, CanvasRenderer } from 'echarts/renderers';
import { UniversalTransition } from 'echarts/features';

echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  SVGRenderer,
  PictorialBarChart,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
  ScatterChart,
  BoxplotChart,
  CanvasRenderer,
  UniversalTransition,
  DatasetComponent,
  TransformComponent,
  ParallelChart,
  BrushComponent,
]);

export default echarts;
