<template>
    <div style="position: relative; display: flex;;" :style="'height: ' + base.height + 'px;' + (!isCompact ? 'padding: 100px 0' : 'padding: 0 0 100px 0')">
        <svg xmlns="http://www.w3.org/2000/svg" :viewBox="(-insulationPadding) + ' 0 400 ' + base.height"
             style="overflow: visible;" :style="isCompact ? 'margin-left: 100px;' : 'margin-left: 300px;'" fill="#FFF">
            <defs>
                <style>
                    svg {
                        font-size: 14px;
                        overflow: visible !important;
                        /*shape-rendering: auto;*/
                        /*shape-rendering: crispEdges;*/
                        stroke-miterlimit: 10;
                        stroke-linecap: square;
                        stroke-linejoin: miter;
                    }

                    text {
                        font-family: 'Raleway', Arial;
                        fill: #000;
                    }

                    [data-hover] {
                        pointer-events: all;
                    }

                    .stroke, .cls-1 {
                        fill: none;
                        stroke: #1d71a2;
                        stroke-width: 1;
                    }

                    .stroke--filled {
                        fill: #fff;
                    }

                    .insulation {
                        fill: url(#lines) !important;
                    }

                    .element rect, .element path {
                        fill: #fff;
                    }

                    .helper-line {
                        fill: none;
                        stroke: #CCC;
                        stroke-width: 1px;
                        pointer-events: none;
                    }

                    .helper-line-dashed {
                        fill: none;
                        stroke: #CCC;
                        stroke-width: 1px;
                        stroke-dasharray: 4;
                        stroke-dashoffset: 4;
                        pointer-events: none;
                    }

                    .hover path:not(.no-highlight), .hover line:not(.no-highlight), .hover polyline:not(.no-highlight), .hover rect:not(.no-highlight) {
                        stroke: yellowgreen !important;
                    }

                    .highlight-on-hover.hover {
                        color: yellowgreen;
                    }

                    #content .svg-exit--hot .hover *, #content .hover .svg-exit--hot * {
                        stroke: red !important;
                    }

                    #content .svg-exit--cold .hover *, #content .hover .svg-exit--cold * {
                        stroke: blue !important;
                    }

                    .helper-line.hover {
                        stroke: black;
                    }

                    foreignObject {
                        overflow: visible;
                    }

                    .svg-circuit {
                        text-align: center;
                    }

                    .svg-circuit:hover foreignObject {
                        outline: 0.5px solid #2FA3E5;
                    }
                </style>
            </defs>
            <defs>
                <pattern id="lines" height="14" width="14" viewBox="0 0 16 16" patternUnits="userSpaceOnUse">
                    <path class="cls-1" d="M6 16L22 0"/>
                    <path class="cls-1" d="M-14 16L2 0"/>
                    <path class="cls-1" d="M10 16L26 0"/>
                    <path class="cls-1" d="M-2 16L14 0"/>
                    <path class="cls-1" d="M2 16L18 0"/>
                    <path class="cls-1" d="M-6 16L10 0"/>
                    <path class="cls-1" d="M-10 16L6 0"/>
                    <path class="cls-1" d="M14 16L30 0"/>
                </pattern>
            </defs>

            <g id="main-wrapper">
                <!-- Total width Helpers -->
                <g>
                    <line class="helper-line"
                          data-hover="total-width"
                          :x1="-joinInputOuterHeight" :y1="base.height + 20"
                          :x2="mmToUnits(totalWidth) - joinInputOuterHeight" :y2="base.height + 20"></line>

                    <line class="helper-line"
                          :x1="-joinInputOuterHeight" :y1="bottomInputY"
                          :x2="-joinInputOuterHeight" :y2="base.height + 20"></line>
                    <line class="helper-line"
                          :x1="mmToUnits(totalWidth) - joinInputOuterHeight" :y1="bottomJoin - bodyHeightInner / 4"
                          :x2="mmToUnits(totalWidth) - joinInputOuterHeight" :y2="base.height + 20"></line>

                    <intersection-helper hover="total-width" :x="-joinInputOuterHeight" :y="base.height + 20"/>
                    <intersection-helper hover="total-width" :x="mmToUnits(totalWidth) - joinInputOuterHeight"
                                         :y="base.height + 20"/>

                    <foreignObject x="0" :y="base.height + 20" :width="mmToUnits(totalWidth) - joinInputOuterHeight"
                                   :height="30" style="pointer-events: none">
                        <div
                            style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 18px;">
                            <div class="cursor-default" data-hover="total-width" style="pointer-events: auto">
                                {{ Math.round(totalWidth) }} <span style="font-size: 80%; ">{{
                                    __('мм')
                                }}</span>
                            </div>
                        </div>
                    </foreignObject>
                </g>

                <g v-if="!isCompact">
                    <base-part hover="base-part" :height="base.height" :size="element.type"
                               :insulation="insulationClean" :thickness="thickness" ref="base"/>

                    <g>
                        <center-part hover="base-center" :x="(base.width / 2)" :y="topInputY"/>
                        <center-part hover="base-center" :x="(base.width / 2)" :y="bottomInputY"/>
                    </g>
                    <g>
                        <join-part hover="vozduhootvod" :x="(base.width / 2)" :y="insulation"
                                   :size="element.vozduhootvod" :bodyThickness="bodyThickness"/>
                        <join-part hover="slivnoi" :x="(base.width / 2)" rotate="180" :y="base.height - (insulation)"
                                   :size="element.slivnoi" :bodyThickness="bodyThickness"/>
                    </g>
                    <g>
                        <join-part hover="base-join" :size="element.baseJoin" :x="(insulation)"
                                   :y="topInputY"
                                   :static-height="joinInputHeight"
                                   rotate="-90"/>
                        <join-part hover="base-join" :size="element.baseJoin" :x="(insulation)"
                                   :y="bottomInputY"
                                   :static-height="joinInputHeight"
                                   rotate="-90"/>
                    </g>

                    <!-- Top Helpers -->
                    <g>
                        <line class="helper-line"
                              data-hover="base-width"
                              :x1="0" :y1="-20"
                              :x2="base.width" :y2="-20"></line>
                        <line class="helper-line"
                              :x1="-60" :y1="-20"
                              :x2="0" :y2="-20"></line>

                        <line class="helper-line"
                              :x1="0" :y1="-20"
                              :x2="0" :y2="0"></line>
                        <line class="helper-line"
                              :x1="base.width" :y1="-20"
                              :x2="base.width" :y2="0"></line>

                        <intersection-helper hover="base-width" :x="0" :y="-20"/>
                        <intersection-helper hover="base-width" :x="base.width" :y="-20"/>

                        <foreignObject :x="-60" :y="-50" :width="60"
                                       :height="30" style="pointer-events: none">
                            <div style="display: flex; align-items: center; justify-content: flex-start; height: 100%">
                                <div class="cursor-default" data-hover="base-width" style="pointer-events: auto">
                                    {{ element.type + insulationMm * 2 }} <span
                                    style="font-size: 80%; ">{{ __('мм') }}</span>
                                </div>
                            </div>
                        </foreignObject>
                    </g>

                    <!--Left Helpers -->
                    <g>
                        <!-- ============= Vertical -->
                        <line class="helper-line"
                              data-hover="total-height|top-height"
                              :x1="-sizeOffset" :y1="insulationClean"
                              :x2="-sizeOffset" :y2="topInputY"></line>
                        <line class="helper-line"
                              data-hover="total-height|center-height"
                              :x1="-sizeOffset" :y1="topInputY"
                              :x2="-sizeOffset" :y2="bottomInputY"></line>
                        <line class="helper-line"
                              data-hover="total-height|bottom-height"
                              :x1="-sizeOffset" :y1="bottomInputY"
                              :x2="-sizeOffset" :y2="base.height - insulationClean"></line>

                        <line class="helper-line"
                              data-hover="total-height-full"
                              :x1="-sizeOffsetSecondFull" :y1="0"
                              :x2="-sizeOffsetSecondFull" :y2="base.height"></line>

                        <!-- Insulation -->
                        <line class="helper-line"
                              data-hover="top-insulation"
                              :x1="-sizeOffset + 20" :y1="0"
                              :x2="-sizeOffset + 20" :y2="insulationClean"></line>
                        <line class="helper-line"
                              data-hover="bottom-insulation"
                              :x1="-sizeOffset + 20" :y1="base.height - insulationClean"
                              :x2="-sizeOffset + 20" :y2="base.height"></line>

                        <!-- ============= Horizontal -->
                        <!-- Total Borders -->
                        <line class="helper-line"
                              :x1="-sizeOffsetSecondFull" :y1="0"
                              :x2="-sizeOffset + (insulationClean ? 20 : 0)" :y2="0"></line>
                        <line class="helper-line"
                              :x1="-sizeOffsetSecondFull" :y1="base.height"
                              :x2="-sizeOffset + (insulationClean ? 20 : 0)" :y2="base.height"></line>

                        <!-- Borders -->
                        <line class="helper-line"
                              :x1="-sizeOffset" :y1="insulationClean"
                              :x2="0" :y2="insulationClean"></line>
                        <line class="helper-line"
                              :x1="-sizeOffset" :y1="base.height - insulationClean"
                              :x2="0" :y2="base.height - insulationClean"></line>

                        <!-- Joins -->
                        <line class="helper-line"
                              :x1="-sizeOffset" :y1="topInputY"
                              :x2="insulation" :y2="topInputY"></line>
                        <line class="helper-line"
                              :x1="-sizeOffset" :y1="bottomInputY"
                              :x2="insulation" :y2="bottomInputY"></line>

                        <!-- Insulation -->
                        <line v-show="insulationClean"
                              class="helper-line"
                              :x1="-sizeOffset + 20" :y1="0"
                              :x2="0" :y2="0"></line>
                        <line v-show="insulationClean"
                              class="helper-line"
                              :x1="-sizeOffset + 20" :y1="base.height"
                              :x2="0" :y2="base.height"></line>

                        <text data-export="baseJoin" :x="-(joinInputOuterHeight) - 30" :y="topInputY + 20" text-anchor="end"></text>
                        <text data-export="baseJoin" :x="-(joinInputOuterHeight) - 30" :y="bottomInputY - 10" text-anchor="end"></text>

                        <!-- ============= Intersections -->
                        <!-- Total Borders -->
                        <intersection-helper hover="total-height-full" :x="-sizeOffsetSecondFull" :y="0"/>
                        <intersection-helper hover="total-height-full" :x="-sizeOffsetSecondFull" :y="base.height"/>

                        <!-- Borders -->
                        <intersection-helper hover="total-height|top-height" :x="-sizeOffset" :y="insulationClean"/>
                        <intersection-helper hover="total-height|bottom-height" :x="-sizeOffset"
                                             :y="base.height - insulationClean"/>

                        <!-- Joins -->
                        <intersection-helper hover="center-height|top-height" :x="-sizeOffset" :y="topInputY"/>
                        <intersection-helper hover="center-height|bottom-height" :x="-sizeOffset" :y="bottomInputY"/>

                        <!-- Insulation -->
                        <intersection-helper v-show="insulationClean"
                                             hover="top-insulation" :x="-sizeOffset + 20" :y="0"/>
                        <intersection-helper v-show="insulationClean"
                                             hover="top-insulation" :x="-sizeOffset + 20" :y="insulationClean"/>
                        <intersection-helper v-show="insulationClean"
                                             hover="bottom-insulation" :x="-sizeOffset + 20" :y="base.height"/>
                        <intersection-helper v-show="insulationClean"
                                             hover="bottom-insulation" :x="-sizeOffset + 20"
                                             :y="base.height - insulationClean"/>
                    </g>

                    <!--Left Numbers -->
                    <g style="pointer-events: none">
                        <!--Top Insulation -->
                        <foreignObject v-show="insulationClean" :x="-sizeOffset + 20" :y="0"
                                       :width="sizeOffset - 20" :height="insulationClean">
                            <div class="flex"
                                 style="align-items: center; justify-content: center; height: 100%; box-sizing: border-box">

                                <div class="cursor-default" data-hover="top-insulation"
                                     style="pointer-events: all; font-size: 80%">
                                    {{ insulationMm }} <span style="">{{
                                        __('мм')
                                    }}</span>
                                </div>
                            </div>
                        </foreignObject>
                        <!--Total Height -->
                        <foreignObject :x="-sizeOffsetSecondFull - sizeOffsetSecond" :y="0"
                                       :width="sizeOffsetSecond" :height="base.height">
                            <div class="flex"
                                 style="align-items: center; justify-content: flex-end; height: 100%; box-sizing: border-box; padding: 10px">

                                <div class="cursor-default" data-hover="total-height-full" style="pointer-events: all">
                                    <!--                                    <input data-hover="total-height" :value="element.height"-->
                                    <!--                                           @input="change('height', $event.target.value)" type="number"-->
                                    <!--                                           min="400"-->
                                    <!--                                           style="width: 45px"/> <span style="font-size: 80%; margin-left: 5px">{{ __('мм') }}</span>-->

                                    <div class="cursor-default" style="pointer-events: all">
                                        {{ element.height + insulationMm * 2 }} <span
                                        style="font-size: 80%;">{{ __('мм') }}</span>
                                    </div>
                                </div>
                            </div>
                        </foreignObject>
                        <!--Top Part -->
                        <foreignObject :x="-sizeOffsetSecondFull" :y="insulationClean"
                                       :width="sizeOffsetSecond" :height="topInputY - insulationClean">
                            <div class="flex"
                                 style="align-items: center; justify-content: flex-end; height: 100%; padding: 10px; box-sizing: border-box">

                                <div class="cursor-default" data-hover="top-height" style="pointer-events: all">
                                    {{ topInputYMm }} <span
                                    style="font-size: 80%;">{{ __('мм') }}</span>
                                </div>
                            </div>
                        </foreignObject>
                        <!--Center Part -->
                        <foreignObject :x="-sizeOffsetSecondFull" :y="topInputY"
                                       :width="sizeOffsetSecond" :height="bottomInputY - topInputY">
                            <div class="flex"
                                 style="align-items: center; justify-content: flex-end; height: 100%; padding: 10px; box-sizing: border-box">

                                <div class="cursor-default" data-hover="center-height" style="pointer-events: all">
                                    {{ centerSpaceMm }} <span style="font-size: 80%;">{{
                                        __('мм')
                                    }}</span>
                                </div>
                            </div>
                        </foreignObject>
                        <!--Bottom Part -->
                        <foreignObject :x="-sizeOffsetSecondFull" :y="bottomInputY"
                                       :width="sizeOffsetSecond" :height="base.height - bottomInputY - insulationClean">
                            <div class="flex"
                                 style="align-items: center; justify-content: flex-end; height: 100%; padding: 10px; box-sizing: border-box">

                                <div class="cursor-default" data-hover="bottom-height" style="pointer-events: all">
                                    {{ bottomInputYMm }} <span style="font-size: 80%;">{{
                                        __('мм')
                                    }}</span>
                                </div>
                            </div>
                        </foreignObject>
                        <!--Bottom Insulation -->
                        <foreignObject v-show="insulationClean" :x="-sizeOffset + 20" :y="base.height - insulationClean"
                                       :width="sizeOffset - 20" :height="insulationClean">
                            <div class="flex"
                                 style="align-items: center; justify-content: center; height: 100%; box-sizing: border-box">

                                <div class="cursor-default" data-hover="bottom-insulation"
                                     style="pointer-events: all; font-size: 80%">
                                    {{ insulationMm }} <span style="">{{
                                        __('мм')
                                    }}</span>
                                </div>
                            </div>
                        </foreignObject>
                    </g>
                </g>

                <!-- Base Slots -->
                <g v-if="!isCompact">
                    <foreignObject :x="0" :y="-90"
                                   :width="base.width" :height="base.height + 90 * 2" style="pointer-events: none">
                        <div class="flex"
                             style="align-items: center; flex-direction: column; justify-content: space-between; height: 100%; box-sizing: border-box;">
                            <slot name="baseTop"></slot>
                            <slot name="baseBottom"></slot>
                        </div>
                    </foreignObject>
                </g>
                <!-- Base Slots -->
                <g v-if="isCompact">
                    <foreignObject :x="bodyInnerStartX" :y="topJoin - 50"
                                   :width="compactHydroWidth" :height="bodyHeightInner + 50 * 2 - 5" style="pointer-events: none">
                        <div class="flex"
                             style="align-items: center; flex-direction: column; justify-content: space-between; height: 100%; box-sizing: border-box;">
                            <slot name="baseTop"></slot>
                            <slot name="baseBottom"></slot>
                        </div>
                    </foreignObject>
                </g>

                <!--Left Joins Offset Helpers -->
                <g>
                    <!-- Joins Width -->
                    <line class="helper-line"
                          :x1="-joinInputHeight + joinedInsulation" :y1="bottomInputY"
                          :x2="-joinInputHeight + joinedInsulation" :y2="bottomInputY + 50"></line>
                    <line class="helper-line"
                          :x1="0" :y1="bottomInputY"
                          :x2="0" :y2="bottomInputY + 50"></line>
                    <line class="helper-line"
                          data-hover="join-input-height"
                          :x1="-joinInputHeight + joinedInsulation" :y1="bottomInputY + 50"
                          :x2="0" :y2="bottomInputY + 50"></line>

                    <g v-show="joinInputHeightMm > 50">
                        <arrow-helper hover="join-input-height" direction="left" :x="-joinInputHeight + joinedInsulation"
                                      :y="bottomInputY + 50"/>
                        <arrow-helper hover="join-input-height" direction="right" :x="0" :y="bottomInputY + 50"/>
                    </g>
                    <g v-show="joinInputHeightMm <= 50">
                        <line class="helper-line"
                              :x1="-joinInputHeight + joinedInsulation - 40" :y1="bottomInputY + 50"
                              :x2="-joinInputHeight + joinedInsulation" :y2="bottomInputY + 50"></line>
                        <arrow-helper hover="join-input-height" direction="right" :x="-joinInputHeight + joinedInsulation"
                                      :y="bottomInputY + 50"/>
                        <arrow-helper hover="join-input-height" direction="left" :x="0" :y="bottomInputY + 50"/>
                    </g>

                    <foreignObject :x="-joinInputHeight + joinedInsulation + (joinInputHeightMm <= 50 ? -40 : 0)"
                                   :y="bottomInputY + 50"
                                   :width="Math.max(40, joinInputHeight - joinedInsulation)" :height="20">
                        <div class="flex"
                             style="align-items: center; justify-content: center; height: 100%; box-sizing: border-box">

                            <div class="cursor-default" data-hover="join-input-height"
                                 style="pointer-events: all; font-size: 80%">
                                {{ joinInputHeightMm - joinedInsulationMm - joinedThicknessMm }} <span style="">{{
                                    __('мм')
                                }}</span>
                            </div>
                        </div>
                    </foreignObject>
                </g>

                <g>
                    <body-part ref="body"
                               :height="bodyHeight"
                               :insulation="bodyInsulationClean"
                               :thickness="bodyThickness"
                               :width="bodyWidth"
                               :hydro="isCompactHydro"
                               :compact-hydro-width="compactHydroWidth"
                               :x="base.width + bodySpace"
                               :y="base.height / 2"/>

                    <g v-if="!isCompact">
                        <joiner-part hover="base-joiner" :flange="joinerFlange" :extension="joinerExtension"
                                     ref="joiner" :x="this.base.width - insulation" :y="topJoin" :size="joinerSizeMm"/>
                        <joiner-part hover="base-joiner" :flange="joinerFlange" flipY :extension="joinerExtension"
                                     :x="this.base.width - insulation" :y="bottomJoin" :size="joinerSizeMm"/>
                    </g>
                </g>

                <!-- Compact Base Joins -->
                <g v-if="isCompact">
                    <join-part hover="base-join" :size="element.baseJoin" :x="(bodyInsulation)"
                               :y="topInputY"
                               :static-height="joinInputHeight"
                               rotate="-90"/>
                    <join-part hover="base-join" :size="element.baseJoin" :x="(bodyInsulation)"
                               :y="bottomInputY"
                               :static-height="joinInputHeight"
                               rotate="-90"/>

                    <text data-export="baseJoin" :x="-(joinInputOuterHeight) - 30" :y="topInputY + 7" text-anchor="end"></text>
                    <text data-export="baseJoin" :x="-(joinInputOuterHeight) - 30" :y="bottomInputY + 5" text-anchor="end"></text>
                </g>
                <!-- Compact Y Joins -->
                <g v-if="isCompact">
                    <join-part hover="vozduhootvod" :x="bodyInnerStartX +
 compactHydroWidth / 2" :y="topJoin"
                               :size="element.vozduhootvod" :bodyThickness="bodyThickness"/>
                    <join-part hover="slivnoi" :x="bodyInnerStartX +
 compactHydroWidth / 2" rotate="180" :y="bottomJoin"
                               :size="element.slivnoi" :bodyThickness="bodyThickness"/>
                </g>

                <g class="svg-circuits">
                    <template v-for="(circuit, $i) in element.circuits">
                        <foreignObject :x="(distanceForCircuit($i) - gapBeforeCircuit(circuit)) - 30"
                                       :y="0"
                                       :width="gapBeforeCircuit(circuit) + 30 * 2" :height="circuitForeignObjectHeight"
                                       style="pointer-events: none" v-show="$i < maxAvailableCircuit || $i == 0">
                            <div class="flex"
                                 style="flex-direction: column; justify-content: space-between; height: 100%; padding: 0 0 54px; box-sizing: border-box">

                                <div style="display: flex;margin-top: auto; margin-bottom: 20px;">
                                    <div style="display: flex; align-items: center; justify-content: center; flex: 1;">
                                        <input :data-hover="'circuit' + $i + '-input-before'"
                                               :value="circuit.distance.before"
                                               @input="change('circuits.' +$i + '.distance.before', $event.target.value)"
                                               v-show="!(isCompact && $i == 0)"
                                               type="number" style="width: 44px"/>

                                        <div style="height:22px" class="cursor-default" :data-hover="'circuit' + $i + '-input-before'"
                                             v-show="(isCompact && $i == 0)">
                                            {{ circuit.distance.before }} <span
                                            style="font-size: 80%;">{{ __('мм') }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </foreignObject>

                        <g :transform="'translate(' + (distanceForCircuit($i)) + ' ' + topJoin + ')'"
                           class="svg-circuit">
                            <foreignObject x="-30" :y="-topJoin"
                                           :width="circuitGap(circuit) + 30 * 2" :height="circuitForeignObjectHeight"
                                           style="pointer-events: auto">
                                <div class="flex"
                                     style="flex-direction: column; justify-content: space-between; height: 100%; padding: 10px 0; box-sizing: border-box;">
                                    <!-- // @todo Исправить pointer-events -->
                                    <div>
                                        <div>
                                            <label class="workspace__label">
                                                {{ __('Контур') }} {{ $i + 1 }}
                                                <checkbox :value="circuit.top.enabled"
                                                          @input="change('circuits.' +$i + '.top.enabled', $event)"/>
                                            </label>
                                        </div>
                                        <select v-show="circuit.top.enabled" :data-hover="'circuit-' + $i + '-top'"
                                                class="workspace__select" :value="circuit.top.value"
                                                @input="change('circuits.' +$i + '.top.value', $event.target.value)">
                                            <option :value="value" v-for="({value, title}) in circuitOptions">{{
                                                    title
                                                }}
                                            </option>
                                        </select>
                                    </div>
                                    <div v-show="$i < maxAvailableCircuit || $i == 0"
                                         style="display: flex;margin-top: auto; margin-bottom: 20px;">
                                        <div
                                            style="display: flex; align-items: center; justify-content: center; flex: 1;">
                                            <input :data-hover="'circuit' + $i + '-input-between'"
                                                   :value="circuit.distance.between"
                                                   @input="change('circuits.' +$i + '.distance.between', $event.target.value)"
                                                   type="number" style="width: 44px"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label class="workspace__label">
                                                {{ __('Контур') }} {{ $i + 1 }}
                                                <checkbox :value="circuit.distance.enabled"
                                                          @input="change('circuits.' +$i + '.distance.enabled', $event)"/>
                                            </label>
                                        </div>
                                        <select :class="{'visibility-hidden': !circuit.distance.enabled}"
                                                :data-hover="'circuit-' + $i + '-distance'" class="workspace__select"
                                                :value="circuit.distance.value"
                                                @input="change('circuits.' +$i + '.distance.value', $event.target.value)">
                                            <option :value="value" v-for="({value, title}) in circuitOptions">{{
                                                    title
                                                }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </foreignObject>

                            <!-- Circuit Inputs Top -->
                            <g class="svg-exits"
                               :class="{'svg-exits--reversed': element.revers}"
                               data-hover="circuit-inputs">
                                <g v-show="circuit.top.enabled" class="svg-exit svg-exit--hot">
                                    <join-part thread
                                               :size="circuit.top.value"
                                               :static-height="mmToUnits(40)"
                                               :x="element.revers ? circuitGap(circuit, 'top') : 0"
                                               :y="0"
                                               :hover="'circuit-' + $i + '-top'"/>
                                </g>
                                <g v-show="circuit.top.enabled" class="svg-exit svg-exit--cold">
                                    <join-part thread
                                               :size="circuit.top.value"
                                               :static-height="mmToUnits(40) + (bodyHeightInner) / 2 - bodyThickness + bodyThickness / 2"
                                               :hover="'circuit-' + $i + '-top'"
                                               :x="!element.revers ? circuitGap(circuit, 'top') : 0"
                                               :y="(bodyHeightInner) / 2 - bodyThickness + bodyThickness / 2"/>
                                </g>
                            </g>

                            <!-- Circuit Inputs Bottom -->
                            <g class="svg-exits"
                               :transform="'translate(0 ' + (bodyHeight / 2 - bodyInsulation) + ')'"
                               :class="{'svg-exits--reversed': element.revers}"
                               data-hover="circuit-inputs">
                                <g v-show="circuit.bottom.enabled" class="svg-exit svg-exit--cold">
                                    <join-part thread
                                               :size="circuit.bottom.value"
                                               :static-height="mmToUnits(40) + (bodyHeightInner) / 2 - bodyThickness + bodyThickness / 2"
                                               :hover="'circuit-' + $i + '-bottom'"
                                               rotate="180"
                                               :x="element.revers ? circuitGap(circuit, 'bottom') : 0"
                                               :y="-bodyThickness / 2"/>
                                </g>
                                <g v-show="circuit.bottom.enabled" class="svg-exit svg-exit--hot">
                                    <join-part thread
                                               :size="circuit.bottom.value"
                                               :static-height="mmToUnits(40)"
                                               :hover="'circuit-' + $i + '-bottom'"
                                               :x="!element.revers ? circuitGap(circuit, 'bottom') : 0"
                                               :y="(bodyHeightInner) / 2 - bodyThickness"
                                               rotate="180"/>
                                </g>
                            </g>

                            <!-- Bottom Helpers -->
                            <g v-show="$i < maxAvailableCircuit"
                               :transform="'translate(0 ' + (-topJoin + base.height / 8) + ')'"
                               style="pointer-events: none">
                                <!-- Vertical -->
                                <line class="helper-line" v-if="$i == 0" :x1="-circuitStartFrom + joinerEnd" :y1="0"
                                      :x2="-circuitStartFrom + joinerEnd" :y2="helperBottom"></line>

                                <line class="helper-line" :x1="0" y1="0" :x2="0" :y2="helperBottom"></line>
                                <line class="helper-line" :x1="circuitGap(circuit, 'bottom')" y1="0" :x2="circuitGap(circuit, 'bottom')"
                                      :y2="helperBottom"></line>
                                <!-- End -->
                                <line v-if="$i == maxAvailableCircuit - 1"
                                      class="helper-line"
                                      :x1="circuitGap(circuit, 'bottom') + endPadding" :y1="0"
                                      :x2="circuitGap(circuit, 'bottom') + endPadding" :y2="helperBottom"></line>

                                <!-- Horizontal -->
                                <!-- Prev -->
                                <line class="helper-line" :data-hover="'circuit' + $i + '-input-before'" :x1="0"
                                      :y1="helperBottom"
                                      :x2="($i == 0 ? -circuitStartFrom + joinerEnd : -(gapBeforeCircuit(circuit, 'bottom')))"
                                      :y2="helperBottom"></line>
                                <!-- Current -->
                                <line class="helper-line" :data-hover="'circuit' + $i + '-input-between'" :x1="0"
                                      :y1="helperBottom" :x2="circuitGap(circuit, 'bottom')" :y2="helperBottom"></line>
                                <!-- End -->
                                <line v-show="$i == maxAvailableCircuit - 1"
                                      class="helper-line" data-hover="end-input-before" :x1="circuitGap(circuit, 'bottom')"
                                      :y1="helperBottom" :x2="circuitGap(circuit, 'bottom') + endPadding"
                                      :y2="helperBottom"></line>

                                <!-- Intersections -->
                                <intersection-helper v-show="$i == 0"
                                                     :x="-circuitStartFrom + joinerEnd" :y="helperBottom"
                                                     :hover="'circuit' + $i + '-input-before'"/>

                                <intersection-helper :x="0" :y="helperBottom"
                                                     :hover="'circuit' + $i + '-input-between|circuit' + $i + '-input-before'"/>

                                <intersection-helper :x="circuitGap(circuit, 'bottom')" :y="helperBottom"
                                                     :hover="'circuit' + $i + '-input-between|circuit' + ($i + 1) + '-input-before' + ($i + 1 == maxAvailableCircuit ? '|end-input-before' : '')"/>

                                <!-- End -->
                                <intersection-helper v-show="$i == maxAvailableCircuit - 1"
                                                     :x="circuitGap(circuit, 'bottom') + endPadding" :y="helperBottom"
                                                     hover="end-input-before"/>
                            </g>
                        </g>
                    </template>

                    <!-- Bottom Numbers -->
                    <foreignObject :x="(base.width + bodySpace + bodyWidth - endPadding - bodyInsulation) - 30"
                                   :y="0"
                                   :width="endPadding + 30 * 2" :height="circuitForeignObjectHeight"
                                   style="pointer-events: none">
                        <div class="flex"
                             style="flex-direction: column; justify-content: space-between; height: 100%; padding: 0 0 54px; box-sizing: border-box">

                            <div style="display: flex;margin-top: auto; margin-bottom: 20px;">
                                <div style="display: flex; align-items: center; justify-content: center; flex: 1;">
                                    <input data-hover="end-input-before" :value="element.distance.output.before"
                                           @input="change('distance.output.before', $event.target.value)" type="number"
                                           style="width: 44px"/>
                                </div>
                            </div>
                        </div>
                    </foreignObject>
                </g>

                <!--End Joiners -->
                <g>
                    <join-part v-show="element.endJoin.top.enabled"
                               thread
                               hover="end-join-top"
                               :static-height="mmToUnits(40)"
                               :size="element.endJoin.top.value"
                               :x="(bodyEndX - bodyInsulation)" :y="topJoin + (bodyHeightInner - bodyThickness) / 4"
                               rotate="90"/>
                    <join-part v-show="element.endJoin.bottom.enabled"
                               thread
                               hover="end-join-bottom"
                               :static-height="mmToUnits(40)"
                               :size="element.endJoin.bottom.value"
                               :x="(bodyEndX - bodyInsulation)" :y="bottomJoin - (bodyHeightInner - bodyThickness) / 4"
                               rotate="90"/>
                </g>

                <!--End Helpers -->
                <g :transform="'translate(' + (bodyEndX) + ' ' + (topJoin - bodyInsulation) + ')'">
                    <!--                    <g v-show="element.endJoin.top.enabled && element.endJoin.bottom.enabled"-->
                    <!--                       transform="translate(0 0)" style="pointer-events: none">-->
                    <!--                        &lt;!&ndash; Horizontal &ndash;&gt;-->
                    <!--                        <line class="helper-line"-->
                    <!--                              x1="0" :y1="(bodyHeightInner - endCenterGap) / 2"-->
                    <!--                              x2="70" :y2="(bodyHeightInner - endCenterGap) / 2"></line>-->
                    <!--                        <line class="helper-line"-->
                    <!--                              x1="0" :y1="(bodyHeightInner + endCenterGap) / 2"-->
                    <!--                              x2="70" :y2="(bodyHeightInner + endCenterGap) / 2"></line>-->

                    <!--                        &lt;!&ndash; Vertical &ndash;&gt;-->
                    <!--                        <line class="helper-line" data-hover="end-join-input"-->
                    <!--                              x1="70" :y1="(bodyHeightInner - endCenterGap) / 2"-->
                    <!--                              x2="70" :y2="(bodyHeightInner + endCenterGap) / 2"></line>-->

                    <!--                        &lt;!&ndash; Intersections &ndash;&gt;-->
                    <!--                        <intersection-helper hover="end-join-input" :x="70" :y="(bodyHeightInner - endCenterGap) / 2"/>-->
                    <!--                        <intersection-helper hover="end-join-input" :x="70" :y="(bodyHeightInner + endCenterGap) / 2"/>-->
                    <!--                    </g>-->
                    <g v-show="element.endJoin.top.enabled && element.endJoin.bottom.enabled"
                       transform="translate(0 0)" style="pointer-events: none">
                        <!-- Horizontal -->
                        <line class="helper-line"
                              x1="0" :y1="0"
                              :x2="55 + 86" :y2="0"></line>
                        <line class="helper-line"
                              x1="0" :y1="(bodyHeight)"
                              :x2="55 + 86" :y2="(bodyHeight)"></line>

                        <line class="helper-line"
                              x1="0" :y1="bodyInsulation - bodyThickness"
                              x2="55" :y2="bodyInsulation - bodyThickness"></line>
                        <line class="helper-line"
                              x1="0" :y1="(bodyHeight - bodyInsulation + bodyThickness)"
                              x2="55" :y2="(bodyHeight - bodyInsulation + bodyThickness)"></line>

                        <!-- Vertical -->
                        <line class="helper-line" data-hover="end-join-input"
                              :x1="55 + 86" :y1="0"
                              :x2="55 + 86" :y2="(bodyHeight)"></line>

                        <line class="helper-line" data-hover="end-join-input-inner"
                              x1="55" :y1="bodyInsulation - bodyThickness"
                              x2="55" :y2="(bodyHeight - bodyInsulation + bodyThickness)"></line>

                        <!-- Intersections -->
                        <intersection-helper hover="end-join-input" :x="55 + 86" :y="0"/>
                        <intersection-helper hover="end-join-input" :x="55 + 86" :y="(bodyHeight)"/>

                        <intersection-helper hover="end-join-input-inner" :x="55" :y="bodyInsulation - bodyThickness"/>
                        <intersection-helper hover="end-join-input-inner" :x="55" :y="(bodyHeight - bodyInsulation + bodyThickness)"/>
                    </g>

                    <!--End Numbers -->
                    <foreignObject :x="55" :y="(bodyHeight - endCenterGap) / 2 - 10" width="86"
                                   :height="endCenterGap + 10 * 2">
                        <div
                            style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 100%; padding: 0 10px;">
                            <div class="w-full flex items-center flex-start">
                                <checkbox :value="element.endJoin.top.enabled"
                                          @input="change('endJoin.top.enabled', $event)"/>
                                <div v-show="element.endJoin.top.enabled" class="ml-0.5" data-hover="end-join-top">
                                    <select class="workspace__select" v-model="element.endJoin.top.value">
                                        <option :value="value" v-for="({value, title}) in endJoinOptions">{{
                                                title
                                            }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="cursor-default" data-hover="end-join-input-inner"
                                 v-show="element.endJoin.top.enabled && element.endJoin.bottom.enabled">
                                {{ bodyHeightInnerMm }} <span
                                style="font-size: 80%;">{{ __('мм') }}</span>
                            </div>
                            <div class="w-full flex items-center flex-start">
                                <checkbox :value="element.endJoin.bottom.enabled"
                                          @input="change('endJoin.bottom.enabled', $event)"/>
                                <div v-show="element.endJoin.bottom.enabled" class="ml-0.5" data-hover="end-join-bottom">
                                    <select class="workspace__select" v-model="element.endJoin.bottom.value">
                                        <option :value="value" v-for="({value, title}) in endJoinOptions">{{
                                                title
                                            }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </foreignObject>
                    <foreignObject :x="55 + 86" :y="(bodyHeight - endCenterGap) / 2 - 10" width="60"
                                   :height="endCenterGap + 10 * 2">
                        <div
                            style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%">

                            <div class="cursor-default" data-hover="end-join-input"
                                 v-show="element.endJoin.top.enabled && element.endJoin.bottom.enabled">
                                {{ bodyHeightMm }} <span
                                style="font-size: 80%;">{{ __('мм') }}</span>
                            </div>
                        </div>
                    </foreignObject>
                </g>

            </g>
        </svg>
    </div>
</template>

<script>
import Checkbox from '~components/inputs/Checkbox'
import BasePart from '../Parts/BasePart'
import JoinPart from '../Parts/JoinPart'
import ThermowellPart from '../Parts/ThermowellPart.vue'
import BodyPart from '../Parts/BodyPart'
import JoinerPart from '../Parts/JoinerPart'
import IntersectionHelper from '../Parts/IntersectionHelper'
import ArrowHelper from '../Parts/ArrowHelper'

import { mmToUnits, unitsToMm } from '../Units'

export default {
    name: "CollectorBalancingProduct",

    components: {
        Checkbox,
        BasePart,
        JoinPart,
        CenterPart: ThermowellPart,
        BodyPart,
        JoinerPart,
        IntersectionHelper,
        ArrowHelper,
    },

    props: {
        element: {},
        endJoinOptions: {},
    },

    data() {
        const circuitOptions = [
            {value: '1"', title: '1"'},
            {value: '1 ¼"', title: '1 ¼"'},
            {value: '1 ½"', title: '1 ½"'},
        ]

        return {
            circuitOptions,
        }
    },

    computed: {
        isCompact() {
            return this.element.compact
        },

        isCompactHydro() {
            return this.isCompact && this.element.hydro
        },

        compactHydroWidth() {
            return this.mmToUnits(this.compactHydroWidthMm)
        },

        compactHydroWidthMm() {
            if (this.element.bodyHeight == 120)
                return 56

            return 76
        },

        base() {
            if (this.isCompact) {
                return {
                    width: 0,
                    height: this.mmToUnits(this.totalHeight),
                }
            }

            return {
                width: this.mmToUnits(this.element.type) + this.insulationClean * 2,
                height: this.mmToUnits(this.totalHeight),
            }
        },

        insulation() {
            return this.insulationClean + this.thickness
        },

        thickness() {
            return this.mmToUnits(this.thicknessMm)
        },

        thicknessMm() {
            if (this.isCompact)
                return 0

            return 5
        },

        insulationMm() {
            return this.element.insulation
        },

        insulationPadding() {
            return 0
        },

        joinedInsulation() {
            return this.mmToUnits(this.joinedInsulationMm + (this.isCompact ? this.bodyThicknessMm : this.thicknessMm))
        },

        joinedInsulationMm() {
            if (this.isCompact)
                return this.bodyInsulationMm

            return this.insulationMm
        },

        joinedThickness() {
            return this.mmToUnits(this.joinedThicknessMm)
        },

        joinedThicknessMm() {
            if (this.isCompact)
                return this.bodyThicknessMm

            return this.thicknessMm
        },

        insulationClean() {
            return this.mmToUnits(this.insulationMm)
        },

        bodyInsulation() {
            return this.bodyInsulationClean + this.bodyThickness
        },

        bodyThickness() {
            return this.mmToUnits(this.bodyThicknessMm)
        },

        bodyThicknessMm() {
            return 4
        },

        bodyInsulationClean() {
            return this.mmToUnits(this.bodyInsulationMm)
        },

        bodyInsulationMm() {
            return this.element.insulation
        },

        flange() {
            return this.element.baseJoin[0] == 'f'
        },

        joinerFlange() {
            return this.element.joinerFlange && this.flange
        },

        joinInputHeight() {
            return this.mmToUnits(this.joinInputHeightMm)
        },

        joinInputHeightMm() {
            if (this.flange) // фланец
                return 115 + this.thicknessMm

            return 40
        },

        joinInputOuterHeight() {
            return this.mmToUnits(this.joinInputOuterHeightMm)
        },

        joinInputOuterHeightMm() {
            let value = this.joinInputHeightMm + (this.flange ? this.flangeCapMm : 0)

            if (this.isCompact)
                return value - this.bodyInsulationMm - this.bodyThicknessMm

            return value - this.insulationMm - this.thicknessMm
        },

        flangeCapMm() {
            return 20
        },

        centerSpaceMm() {
            return this.totalHeight - this.topInputYMm - this.bottomInputYMm - this.insulationMm * 2
        },

        topInputYMm() {
            return unitsToMm(this.topInputY - this.insulationClean, true)
        },

        topInputY() {
            if (this.isCompact)
                return this.topJoin + (this.bodyHeightInner - this.joinCenterGap) / 2

            return this.base.height / 2 - this.bodyHeightInner / 2 - this.joinerHeight + this.mmToUnits(this.joinerSizeMm) / 2
        },

        bottomInputYMm() {
            return unitsToMm(this.base.height - this.bottomInputY - this.insulationClean, true)
        },

        bottomInputY() {
            if (this.isCompact)
                return this.bottomJoin - (this.bodyHeightInner - this.joinCenterGap) / 2

            return this.base.height / 2 + this.bodyHeightInner / 2 + this.joinerHeight - this.mmToUnits(this.joinerSizeMm) / 2
        },

        sizeOffset() {
            return (this.flange ? (this.insulationClean ? 0 : 15) + 120 : 90)
        },

        sizeOffsetSecond() {
            return 90
        },

        sizeOffsetSecondFull() {
            return this.sizeOffsetSecond + this.sizeOffset
        },

        circuitStartFrom() {
            if (this.maxAvailableCircuit == 0)
                return this.joinerEnd

            return this.joinerEnd + this.bodyThickness + this.gapBeforeCircuit(this.element.circuits[0])
        },

        helperBottom() {
            return this.circuitForeignObjectHeight * 7 / 8 - 110
        },

        circuitForeignObjectHeight() {
            return Math.max(440, this.base.height)
        },

        joinerExtension() {
            // if (this.element.type == 159 || this.element.type == 219)
            //     return this.mmToUnits(50)

            return this.mmToUnits(50)
        },

        joinerSizeMm() {
            if (this.element.baseJoin == 'f76')
                return 76
            else if (this.element.baseJoin == 'f89')
                return 89

            return 56
        },

        bodySpace() {
            if (this.isCompact)
                return 0

            return this.joinerWidth - this.joinerEnd - this.bodyInsulation * 2 + this.bodyThickness
        },

        joinerRoundSize() {
            let roundSize

            if (this.joinerSizeMm == 56)
                roundSize = this.mmToUnits(100)
            else if (this.joinerSizeMm == 76)
                roundSize = this.mmToUnits(130)
            else if (this.joinerSizeMm == 89)
                roundSize = this.mmToUnits(160)
            else
                roundSize = this.mmToUnits(this.joinerSizeMm * 1.5)

            return roundSize
        },

        joinerWidth() {
            return this.joinerRoundSize +
                this.joinerExtension +
                (this.joinerFlange ? this.flangeHeight * 2 + this.flangeGap : 0)
        },

        joinerHeight() {
            return this.joinerRoundSize
        },

        joinerEnd() {
            if (this.isCompact)
                return 0 + this.bodyThickness

            return this.mmToUnits(this.joinerSizeMm) + this.mmToUnits(14) + this.bodyThickness
        },

        flangeHeight() {
            return this.mmToUnits(20)
        },

        flangeGap() {
            return this.mmToUnits(10)
        },

        bodyHeight() {
            return this.bodyHeightInner + this.bodyInsulationClean * 2
        },

        bodyHeightMm() {
            return this.bodyHeightInnerMm + this.bodyInsulationMm * 2
        },

        bodyHeightInnerMm() {
            if (this.element.bodyHeight)
                return this.element.bodyHeight

            if (this.element.type == 219)
                return 200

            return 160
        },

        bodyHeightInner() {
            return this.mmToUnits(this.bodyHeightInnerMm)
        },

        joinCenterGap() {
            return this.bodyHeightInner / 2
        },

        endCenterGapMm() {
            return this.bodyHeightInnerMm / 2
        },

        endCenterGap() {
            return this.bodyHeightInner / 2
        },

        endPadding() {
            return Math.max(40, this.element.distance.output.before)
        },

        bodyWidth() {
            return this.bodyWidthInner + this.bodyInsulation * 2
        },

        bodyWidthInner() {
            let circuitGap = 0
            if (this.element.circuits.length && this.maxAvailableCircuit) {
                let circuit = this.element.circuits[this.maxAvailableCircuit - 1]
                circuitGap = this.circuitGap(circuit)
            }

            return this.joinerEnd + this.circuitOffset(this.maxAvailableCircuit - 1) + this.endPadding + circuitGap
        },

        bodyStartX() {
            return this.base.width + this.bodySpace + this.bodyInsulation
        },

        bodyInnerStartX() {
            return this.bodyStartX
        },

        bodyEndX() {
            return this.bodyStartX + this.bodyWidthInner + this.bodyInsulation
        },

        topJoin() {
            return this.base.height / 2 - this.bodyHeight / 2 + this.bodyInsulation
        },

        bottomJoin() {
            return this.base.height / 2 + this.bodyHeight / 2 - this.bodyInsulation
        },

        totalHeight() {
            return +this.cleanHeight + this.insulationMm * 2
        },

        totalWidth() {
            return unitsToMm(this.bodyEndX, false) + 40 - this.bodyInsulationMm - this.bodyThicknessMm + this.joinInputOuterHeightMm
        },

        cleanHeight() {
            return +this.element.height
        },

        enabledCircuits() {
            return this.element.circuits.filter(circuit => circuit.top.enabled || circuit.bottom.enabled)
        },

        maxAvailableCircuit() {
            let result = 0
            this.element.circuits.forEach((circuit, i) => {
                if (circuit.top.enabled || circuit.bottom.enabled) {
                    result = i + 1
                }
            })

            return result
        },

        maxAvailableCircuitObject() {
            return this.element.circuits[this.maxAvailableCircuit - 1]
        },
    },

    watch: {
        bodyWidth() {
            this.$emit('changeWidth')
        },
    },

    methods: {
        gapBeforeCircuit(circuit, side) {
            const distance = side === 'bottom' ? circuit.distanceBottom : circuit.distanceTop

            return Math.max(70, this.mmToUnits(distance.before))
        },

        circuitGap(circuit, side) {
            const distance = side === 'bottom' ? circuit.distanceBottom : circuit.distanceTop

            return Math.max(70, this.mmToUnits(distance.between))
        },

        distanceForCircuit(index, side) {
            return this.base.width + this.bodySpace + this.bodyInsulation + this.circuitOffset(index, side) + this.joinerEnd
        },

        circuitOffset(index, side) {
            let result = 0

            this.element.circuits.forEach((circuit, i) => {
                if (i > index)
                    return

                result += this.gapBeforeCircuit(circuit, side) + (i == index ? 0 : this.circuitGap(circuit, side))
            })

            return result
        },

        mmToUnits: mmToUnits,
        unitsToMm: unitsToMm,

        change(field, value) {
            this.$emit('input', {field, value})
        },
    },
}
</script>
