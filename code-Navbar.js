import React from "react";
import svgPaths from "./svg-v8dryfpz4b";
import { useActiveBreakpoint } from "figma:react";
import { useState, useEffect, useRef } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "motion/react";
import { defineProperties } from "figma:react";

interface ButtonProps {
  txt?: string;
  icn?: React.ReactNode | null;
  breakpoint?: "Desktop" | "Mobile";
  hasIcon?: "yes" | "no";
  hasText?: "no" | "yes";
  isHovered?: "no" | "yes";
  isPressed?: "no" | "yes";
  isActivated?: "no" | "yes";
}

function Button({
  txt = "button",
  icn = null,
  breakpoint = "Desktop",
  hasIcon = "no",
  hasText = "yes",
  isHovered = "no",
  isPressed = "no",
  isActivated = "no",
}: ButtonProps) {
  if (
    breakpoint === "Desktop" &&
    hasIcon === "no" &&
    hasText === "yes" &&
    isHovered === "yes" &&
    isPressed === "no" &&
    isActivated === "no"
  ) {
    return (
      <div
        className="bg-[rgba(255,255,255,0.05)] relative rounded-lg size-full"
        data-name="Breakpoint=Desktop, has icon=no, has text=yes, is hovered=yes, is pressed=no, is activated=no"
      >
        <div className="flex flex-row items-center justify-center relative size-full">
          <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-4 py-0 relative size-full">
            <div className="font-['Manrope:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000000] text-[24px] text-left text-nowrap">
              <p className="block leading-[normal] whitespace-pre">{txt}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (
    breakpoint === "Desktop" &&
    hasIcon === "no" &&
    hasText === "yes" &&
    isHovered === "no" &&
    isPressed === "yes" &&
    isActivated === "no"
  ) {
    return (
      <div
        className="bg-[rgba(255,255,255,0.15)] relative rounded-lg size-full"
        data-name="Breakpoint=Desktop, has icon=no, has text=yes, is hovered=no, is pressed=yes, is activated=no"
      >
        <div className="flex flex-row items-center justify-center relative size-full">
          <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-4 py-0 relative size-full">
            <div className="font-['Manrope:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000000] text-[24px] text-left text-nowrap">
              <p className="block leading-[normal] whitespace-pre">{txt}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (
    breakpoint === "Desktop" &&
    hasIcon === "no" &&
    hasText === "yes" &&
    isHovered === "no" &&
    isPressed === "no" &&
    isActivated === "yes"
  ) {
    return (
      <div
        className="bg-[#ffffff] relative rounded-lg size-full"
        data-name="Breakpoint=Desktop, has icon=no, has text=yes, is hovered=no, is pressed=no, is activated=yes"
      >
        <div className="flex flex-row items-center justify-center relative size-full">
          <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-4 py-0 relative size-full">
            <div className="font-['Manrope:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000000] text-[24px] text-left text-nowrap">
              <p className="block leading-[normal] whitespace-pre">{txt}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (
    breakpoint === "Desktop" &&
    hasIcon === "yes" &&
    hasText === "no" &&
    isHovered === "no" &&
    isPressed === "no" &&
    isActivated === "no"
  ) {
    return (
      <div
        className="box-border content-stretch cursor-pointer flex flex-row gap-2.5 items-center justify-center p-0 relative rounded-lg size-full"
        data-name="Breakpoint=Desktop, has icon=yes, has text=no, is hovered=no, is pressed=no, is activated=no"
      >
        {icn || (
          <div className="relative shrink-0 size-12" data-name="ICN">
            <div className="absolute bottom-[22.917%] left-[20.833%] right-[20.833%] top-[22.917%]">
              <div className="absolute bottom-[-7.692%] left-[-7.143%] right-[-7.143%] top-[-7.692%]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 32 30"
                >
                  <g id="Group 9">
                    <path
                      d={svgPaths.p7abd480}
                      id="Polygon 1"
                      stroke="var(--stroke-0, black)"
                      strokeLinecap="round"
                      strokeWidth="4"
                    />
                    <path
                      d={svgPaths.p6150b40}
                      id="Polygon 2"
                      stroke="var(--stroke-0, black)"
                      strokeLinecap="round"
                      strokeWidth="4"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div
              className="absolute bottom-[18.75%] left-[16.666%] right-[16.667%] top-[18.749%]"
              data-name="Union"
            >
              <div
                className="absolute bottom-0 left-0 right-0 top-0"
                style={
                  {
                    "--fill-0": "rgba(0, 0, 0, 1)",
                  } as React.CSSProperties
                }
              >
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  role="presentation"
                  viewBox="0 0 32 30"
                >
                  <path
                    d={svgPaths.p231cea00}
                    fill="var(--fill-0, black)"
                    id="Union"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (
    breakpoint === "Desktop" &&
    hasIcon === "yes" &&
    hasText === "no" &&
    isHovered === "yes" &&
    isPressed === "no" &&
    isActivated === "no"
  ) {
    return (
      <div
        className="bg-[rgba(255,255,255,0.05)] box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-0 relative rounded-lg size-full"
        data-name="Breakpoint=Desktop, has icon=yes, has text=no, is hovered=yes, is pressed=no, is activated=no"
      >
        {icn || (
          <div className="relative shrink-0 size-12" data-name="ICN">
            <div className="absolute bottom-[22.917%] left-[20.833%] right-[20.833%] top-[22.917%]">
              <div className="absolute bottom-[-7.692%] left-[-7.143%] right-[-7.143%] top-[-7.692%]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 32 30"
                >
                  <g id="Group 9">
                    <path
                      d={svgPaths.p7abd480}
                      id="Polygon 1"
                      stroke="var(--stroke-0, black)"
                      strokeLinecap="round"
                      strokeWidth="4"
                    />
                    <path
                      d={svgPaths.p6150b40}
                      id="Polygon 2"
                      stroke="var(--stroke-0, black)"
                      strokeLinecap="round"
                      strokeWidth="4"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div
              className="absolute bottom-[18.75%] left-[16.666%] right-[16.667%] top-[18.749%]"
              data-name="Union"
            >
              <div
                className="absolute bottom-0 left-0 right-0 top-0"
                style={
                  {
                    "--fill-0": "rgba(0, 0, 0, 1)",
                  } as React.CSSProperties
                }
              >
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  role="presentation"
                  viewBox="0 0 32 30"
                >
                  <path
                    d={svgPaths.p231cea00}
                    fill="var(--fill-0, black)"
                    id="Union"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (
    breakpoint === "Desktop" &&
    hasIcon === "yes" &&
    hasText === "no" &&
    isHovered === "no" &&
    isPressed === "yes" &&
    isActivated === "no"
  ) {
    return (
      <div
        className="bg-[rgba(255,255,255,0.15)] box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-0 relative rounded-lg size-full"
        data-name="Breakpoint=Desktop, has icon=yes, has text=no, is hovered=no, is pressed=yes, is activated=no"
      >
        {icn || (
          <div className="relative shrink-0 size-12" data-name="ICN">
            <div className="absolute bottom-[22.917%] left-[20.833%] right-[20.833%] top-[22.917%]">
              <div className="absolute bottom-[-7.692%] left-[-7.143%] right-[-7.143%] top-[-7.692%]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 32 30"
                >
                  <g id="Group 9">
                    <path
                      d={svgPaths.p7abd480}
                      id="Polygon 1"
                      stroke="var(--stroke-0, black)"
                      strokeLinecap="round"
                      strokeWidth="4"
                    />
                    <path
                      d={svgPaths.p6150b40}
                      id="Polygon 2"
                      stroke="var(--stroke-0, black)"
                      strokeLinecap="round"
                      strokeWidth="4"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div
              className="absolute bottom-[18.75%] left-[16.666%] right-[16.667%] top-[18.749%]"
              data-name="Union"
            >
              <div
                className="absolute bottom-0 left-0 right-0 top-0"
                style={
                  {
                    "--fill-0": "rgba(0, 0, 0, 1)",
                  } as React.CSSProperties
                }
              >
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  role="presentation"
                  viewBox="0 0 32 30"
                >
                  <path
                    d={svgPaths.p231cea00}
                    fill="var(--fill-0, black)"
                    id="Union"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (
    breakpoint === "Desktop" &&
    hasIcon === "yes" &&
    hasText === "no" &&
    isHovered === "no" &&
    isPressed === "no" &&
    isActivated === "yes"
  ) {
    return (
      <div
        className="bg-[#ffffff] box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-0 relative rounded-lg size-full"
        data-name="Breakpoint=Desktop, has icon=yes, has text=no, is hovered=no, is pressed=no, is activated=yes"
      >
        {icn || (
          <div className="relative shrink-0 size-12" data-name="ICN">
            <div className="absolute bottom-[22.917%] left-[20.833%] right-[20.833%] top-[22.917%]">
              <div className="absolute bottom-[-7.692%] left-[-7.143%] right-[-7.143%] top-[-7.692%]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 32 30"
                >
                  <g id="Group 9">
                    <path
                      d={svgPaths.p7abd480}
                      id="Polygon 1"
                      stroke="var(--stroke-0, black)"
                      strokeLinecap="round"
                      strokeWidth="4"
                    />
                    <path
                      d={svgPaths.p6150b40}
                      id="Polygon 2"
                      stroke="var(--stroke-0, black)"
                      strokeLinecap="round"
                      strokeWidth="4"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div
              className="absolute bottom-[18.75%] left-[16.666%] right-[16.667%] top-[18.749%]"
              data-name="Union"
            >
              <div
                className="absolute bottom-0 left-0 right-0 top-0"
                style={
                  {
                    "--fill-0": "rgba(0, 0, 0, 1)",
                  } as React.CSSProperties
                }
              >
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  role="presentation"
                  viewBox="0 0 32 30"
                >
                  <path
                    d={svgPaths.p231cea00}
                    fill="var(--fill-0, black)"
                    id="Union"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (
    breakpoint === "Mobile" &&
    hasIcon === "no" &&
    hasText === "yes" &&
    isHovered === "no" &&
    isPressed === "no" &&
    isActivated === "no"
  ) {
    return (
      <div
        className="cursor-pointer relative rounded-lg size-full"
        data-name="Breakpoint=Mobile, has icon=no, has text=yes, is hovered=no, is pressed=no, is activated=no"
      >
        <div className="flex flex-row items-center justify-center relative size-full">
          <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-4 py-0 relative size-full">
            <div className="font-['Manrope:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000000] text-[15px] text-left text-nowrap">
              <p className="block leading-[normal] whitespace-pre">{txt}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (
    breakpoint === "Mobile" &&
    hasIcon === "no" &&
    hasText === "yes" &&
    isHovered === "yes" &&
    isPressed === "no" &&
    isActivated === "no"
  ) {
    return (
      <div
        className="bg-[rgba(255,255,255,0.05)] relative rounded-lg size-full"
        data-name="Breakpoint=Mobile, has icon=no, has text=yes, is hovered=yes, is pressed=no, is activated=no"
      >
        <div className="flex flex-row items-center justify-center relative size-full">
          <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-4 py-0 relative size-full">
            <div className="font-['Manrope:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000000] text-[15px] text-left text-nowrap">
              <p className="block leading-[normal] whitespace-pre">{txt}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (
    breakpoint === "Mobile" &&
    hasIcon === "no" &&
    hasText === "yes" &&
    isHovered === "no" &&
    isPressed === "yes" &&
    isActivated === "no"
  ) {
    return (
      <div
        className="bg-[rgba(255,255,255,0.15)] relative rounded-lg size-full"
        data-name="Breakpoint=Mobile, has icon=no, has text=yes, is hovered=no, is pressed=yes, is activated=no"
      >
        <div className="flex flex-row items-center justify-center relative size-full">
          <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-4 py-0 relative size-full">
            <div className="font-['Manrope:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000000] text-[15px] text-left text-nowrap">
              <p className="block leading-[normal] whitespace-pre">{txt}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (
    breakpoint === "Mobile" &&
    hasIcon === "no" &&
    hasText === "yes" &&
    isHovered === "no" &&
    isPressed === "no" &&
    isActivated === "yes"
  ) {
    return (
      <div
        className="bg-[#ffffff] relative rounded-lg size-full"
        data-name="Breakpoint=Mobile, has icon=no, has text=yes, is hovered=no, is pressed=no, is activated=yes"
      >
        <div className="flex flex-row items-center justify-center relative size-full">
          <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-4 py-0 relative size-full">
            <div className="font-['Manrope:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000000] text-[15px] text-left text-nowrap">
              <p className="block leading-[normal] whitespace-pre">{txt}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (
    breakpoint === "Mobile" &&
    hasIcon === "yes" &&
    hasText === "no" &&
    isHovered === "no" &&
    isPressed === "no" &&
    isActivated === "no"
  ) {
    return (
      <div
        className="box-border content-stretch cursor-pointer flex flex-row gap-2.5 items-center justify-center p-0 relative rounded-lg size-full"
        data-name="Breakpoint=Mobile, has icon=yes, has text=no, is hovered=no, is pressed=no, is activated=no"
      >
        {icn || (
          <div
            className="h-[37.947px] relative shrink-0 w-[30px]"
            data-name="ICN"
          >
            <div className="absolute bottom-[22.917%] left-[20.833%] right-[20.833%] top-[22.917%]">
              <div className="absolute bottom-[-9.73%] left-[-9.035%] right-[-9.035%] top-[-9.73%]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 27 25"
                >
                  <g id="Group 9">
                    <path
                      d={svgPaths.p1136d180}
                      id="Polygon 1"
                      stroke="var(--stroke-0, black)"
                      strokeLinecap="round"
                      strokeWidth="4"
                    />
                    <path
                      d={svgPaths.p3f645300}
                      id="Polygon 2"
                      stroke="var(--stroke-0, black)"
                      strokeLinecap="round"
                      strokeWidth="4"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div
              className="absolute bottom-[18.75%] left-[16.666%] right-[16.667%] top-[18.749%]"
              data-name="Union"
            >
              <div
                className="absolute bottom-0 left-0 right-0 top-[0.001%]"
                style={
                  {
                    "--fill-0": "rgba(0, 0, 0, 1)",
                  } as React.CSSProperties
                }
              >
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  role="presentation"
                  viewBox="0 0 26 24"
                >
                  <path
                    d={svgPaths.p37fcd400}
                    fill="var(--fill-0, black)"
                    id="Union"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (
    breakpoint === "Mobile" &&
    hasIcon === "yes" &&
    hasText === "no" &&
    isHovered === "yes" &&
    isPressed === "no" &&
    isActivated === "no"
  ) {
    return (
      <div
        className="bg-[rgba(255,255,255,0.05)] box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-0 relative rounded-lg size-full"
        data-name="Breakpoint=Mobile, has icon=yes, has text=no, is hovered=yes, is pressed=no, is activated=no"
      >
        {icn || (
          <div
            className="h-[37.947px] relative shrink-0 w-[30px]"
            data-name="ICN"
          >
            <div className="absolute bottom-[22.917%] left-[20.833%] right-[20.833%] top-[22.917%]">
              <div className="absolute bottom-[-9.73%] left-[-9.035%] right-[-9.035%] top-[-9.73%]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 27 25"
                >
                  <g id="Group 9">
                    <path
                      d={svgPaths.p212b1ee4}
                      id="Polygon 1"
                      stroke="var(--stroke-0, black)"
                      strokeLinecap="round"
                      strokeWidth="4"
                    />
                    <path
                      d={svgPaths.p2bb9320}
                      id="Polygon 2"
                      stroke="var(--stroke-0, black)"
                      strokeLinecap="round"
                      strokeWidth="4"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div
              className="absolute bottom-[18.75%] left-[16.666%] right-[16.667%] top-[18.749%]"
              data-name="Union"
            >
              <div
                className="absolute bottom-0 left-0 right-0 top-[0.001%]"
                style={
                  {
                    "--fill-0": "rgba(0, 0, 0, 1)",
                  } as React.CSSProperties
                }
              >
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  role="presentation"
                  viewBox="0 0 26 24"
                >
                  <path
                    d={svgPaths.p37fcd400}
                    fill="var(--fill-0, black)"
                    id="Union"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (
    breakpoint === "Mobile" &&
    hasIcon === "yes" &&
    hasText === "no" &&
    isHovered === "no" &&
    isPressed === "yes" &&
    isActivated === "no"
  ) {
    return (
      <div
        className="bg-[rgba(255,255,255,0.15)] box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-0 relative rounded-lg size-full"
        data-name="Breakpoint=Mobile, has icon=yes, has text=no, is hovered=no, is pressed=yes, is activated=no"
      >
        {icn || (
          <div
            className="h-[37.947px] relative shrink-0 w-[30px]"
            data-name="ICN"
          >
            <div className="absolute bottom-[22.917%] left-[20.833%] right-[20.833%] top-[22.917%]">
              <div className="absolute bottom-[-9.73%] left-[-9.035%] right-[-9.035%] top-[-9.73%]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 27 25"
                >
                  <g id="Group 9">
                    <path
                      d={svgPaths.p212b1ee4}
                      id="Polygon 1"
                      stroke="var(--stroke-0, black)"
                      strokeLinecap="round"
                      strokeWidth="4"
                    />
                    <path
                      d={svgPaths.p2bb9320}
                      id="Polygon 2"
                      stroke="var(--stroke-0, black)"
                      strokeLinecap="round"
                      strokeWidth="4"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div
              className="absolute bottom-[18.75%] left-[16.666%] right-[16.667%] top-[18.749%]"
              data-name="Union"
            >
              <div
                className="absolute bottom-0 left-0 right-0 top-[0.001%]"
                style={
                  {
                    "--fill-0": "rgba(0, 0, 0, 1)",
                  } as React.CSSProperties
                }
              >
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  role="presentation"
                  viewBox="0 0 26 24"
                >
                  <path
                    d={svgPaths.p37fcd400}
                    fill="var(--fill-0, black)"
                    id="Union"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (
    breakpoint === "Mobile" &&
    hasIcon === "yes" &&
    hasText === "no" &&
    isHovered === "no" &&
    isPressed === "no" &&
    isActivated === "yes"
  ) {
    return (
      <div
        className="bg-[#ffffff] box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-0 relative rounded-lg size-full"
        data-name="Breakpoint=Mobile, has icon=yes, has text=no, is hovered=no, is pressed=no, is activated=yes"
      >
        {icn || (
          <div
            className="h-[37.947px] relative shrink-0 w-[30px]"
            data-name="ICN"
          >
            <div className="absolute bottom-[22.917%] left-[20.833%] right-[20.833%] top-[22.917%]">
              <div className="absolute bottom-[-9.73%] left-[-9.035%] right-[-9.035%] top-[-9.73%]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 27 25"
                >
                  <g id="Group 9">
                    <path
                      d={svgPaths.p212b1ee4}
                      id="Polygon 1"
                      stroke="var(--stroke-0, black)"
                      strokeLinecap="round"
                      strokeWidth="4"
                    />
                    <path
                      d={svgPaths.p2bb9320}
                      id="Polygon 2"
                      stroke="var(--stroke-0, black)"
                      strokeLinecap="round"
                      strokeWidth="4"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div
              className="absolute bottom-[18.75%] left-[16.666%] right-[16.667%] top-[18.749%]"
              data-name="Union"
            >
              <div
                className="absolute bottom-0 left-0 right-0 top-[0.001%]"
                style={
                  {
                    "--fill-0": "rgba(0, 0, 0, 1)",
                  } as React.CSSProperties
                }
              >
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  role="presentation"
                  viewBox="0 0 26 24"
                >
                  <path
                    d={svgPaths.p37fcd400}
                    fill="var(--fill-0, black)"
                    id="Union"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  return (
    <div
      className="cursor-pointer relative rounded-lg size-full"
      data-name="Breakpoint=Desktop, has icon=no, has text=yes, is hovered=no, is pressed=no, is activated=no"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-4 py-0 relative size-full">
          <div className="font-['Manrope:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000000] text-[24px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">{txt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Shared state for auto-scrolling - needs to be global so all components can access it
// Create a plain object instead of using useRef hook outside of a component
const isAutoScrollingState = { current: false };

// Helper to initiate programmatic scroll and pause autohide - moved to global scope
function startProgrammaticScroll(scrollFn: () => void) {
  if (isAutoScrollingState.current) return; // Prevent multiple calls
  
  isAutoScrollingState.current = true;
  scrollFn();
  
  // Re-enable after animation completes
  setTimeout(() => {
    isAutoScrollingState.current = false;
  }, 800);
}

// Improved scroll function that uses multiple strategies to find sections
function scrollToSection(id: string) {
  console.log(`Attempting to scroll to section: ${id}`);
  
  // Special case for home/top
  if (id === "hero" || id === "home" || id === "top") {
    console.log("Scrolling to top of page");
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  
  // For other sections, try several ID variants
  const candidates = [id, id.toLowerCase(), id.toUpperCase(), id.charAt(0).toUpperCase()+id.slice(1)];
  // Special mapping for legacy layer names
  if(id === "about") {
    candidates.push("scrollHelperAbout");
  }
  if(id === "work") {
    candidates.push("scrollHelperWork");
  }
  if(id === "contact") {
    candidates.push("scrollHelperContact");
  }
  let directElement: HTMLElement | null = null;
  for (const cand of candidates) {
    directElement = document.getElementById(cand);
    if (directElement) break;
  }
  if (directElement) {
    console.log(`Found element with ID: ${id}, scrolling to it`);
    const headerEl = document.querySelector('[data-name="Header"]') as HTMLElement | null;
    const headerOffset = headerEl ? headerEl.getBoundingClientRect().height : 0;
    const elementTop = directElement.getBoundingClientRect().top + window.scrollY - headerOffset + 10;
    window.scrollTo({ top: elementTop, behavior: 'smooth' });
    return;
  }
  
  // If not found by ID, try different search strategies
  console.log(`Element with ID "${id}" not found, trying alternative strategies`);
  
  // Try finding by section[id="X"] or div[id="X"]
  const elementByTag = document.querySelector(`section[id="${id}"], div[id="${id}"]`);
  if (elementByTag) {
    console.log(`Found element by tag with ID: ${id}`);
    const headerEl = document.querySelector('[data-name="Header"]') as HTMLElement | null;
    const headerOffset = headerEl ? headerEl.getBoundingClientRect().height : 0;
    const elementTop = (elementByTag as HTMLElement).getBoundingClientRect().top + window.scrollY - headerOffset + 10;
    window.scrollTo({ top: elementTop, behavior: 'smooth' });
    return;
  }
  
  // Try finding by data-name attribute (case-insensitive)
  const elementsByName = Array.from(document.querySelectorAll('[data-name]')).filter(el => {
    const name = (el as HTMLElement).dataset.name;
    return name && name.toLowerCase() === id.toLowerCase();
  });
  
  if (elementsByName.length > 0) {
    console.log(`Found element by data-name: ${id}`);
    const headerEl = document.querySelector('[data-name="Header"]') as HTMLElement | null;
    const headerOffset = headerEl ? headerEl.getBoundingClientRect().height : 0;
    const elementTop = (elementsByName[0] as HTMLElement).getBoundingClientRect().top + window.scrollY - headerOffset + 10;
    window.scrollTo({ top: elementTop, behavior: 'smooth' });
    return;
  }
  
  // Try by class matching the section name
  const elementsByClass = document.querySelectorAll(`.${id}, .${id}-section`);
  if (elementsByClass.length > 0) {
    console.log(`Found element by class: ${id}`);
    const headerEl = document.querySelector('[data-name="Header"]') as HTMLElement | null;
    const headerOffset = headerEl ? headerEl.getBoundingClientRect().height : 0;
    const elementTop = (elementsByClass[0] as HTMLElement).getBoundingClientRect().top + window.scrollY - headerOffset + 10;
    window.scrollTo({ top: elementTop, behavior: 'smooth' });
    return;
  }
  
  // If still not found, use a heuristic approach
  console.log(`Could not find element for ${id}, using fallback position`);
  
  // Final fallback proportional scrolling based on the document height
  const docHeight = Math.max(
    document.body.scrollHeight, 
    document.documentElement.scrollHeight
  );
  
  switch(id) {
    case "about":
      // About section typically comes right after the hero section
      window.scrollTo({ 
        top: Math.min(window.innerHeight, docHeight * 0.2), 
        behavior: "smooth" 
      });
      break;
      
    case "work":
      // Work section is typically in the middle
      window.scrollTo({ 
        top: Math.min(docHeight * 0.5, docHeight - window.innerHeight), 
        behavior: "smooth" 
      });
      break;
      
    case "contact":
      // Fallback: scroll near bottom but leave some margin
      window.scrollTo({ 
        top: Math.max(docHeight - window.innerHeight * 0.9, 0),
        behavior: "smooth" 
      });
      break;
      
    default:
      console.warn(`Unknown section: ${id}`);
  }
}

function NavDesktop() {
  return (
    <nav
      className="box-border content-stretch cursor-pointer flex flex-row gap-4 items-center justify-end overflow-visible p-0 relative shrink-0"
      data-name="Nav"
    >
      <motion.div
        className="box-border content-stretch flex flex-row gap-2.5 h-[60px] items-center justify-center px-4 py-0 relative rounded-lg shrink-0"
        data-name="Button"
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5, transition: { duration: 0.1 } }}
        onClick={() => startProgrammaticScroll(() => scrollToSection("home"))}
      >
        <Button txt="Home" />
      </motion.div>
      <motion.div
        className="box-border content-stretch flex flex-row gap-2.5 h-[60px] items-center justify-center px-4 py-0 relative rounded-lg shrink-0"
        data-name="Button"
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5, transition: { duration: 0.1 } }}
        onClick={() => startProgrammaticScroll(() => scrollToSection("about"))}
      >
        <Button txt="About" />
      </motion.div>
      <motion.div
        className="box-border content-stretch flex flex-row gap-2.5 h-[60px] items-center justify-center px-4 py-0 relative rounded-lg shrink-0"
        data-name="Button"
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5, transition: { duration: 0.1 } }}
        onClick={() => startProgrammaticScroll(() => scrollToSection("work"))}
      >
        <div className="font-['Manrope:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000000] text-[24px] text-left text-nowrap">
          <p className="block leading-[normal] whitespace-pre">Work</p>
        </div>
      </motion.div>
      <motion.div
        className="box-border content-stretch flex flex-row gap-2.5 h-[60px] items-center justify-center px-4 py-0 relative rounded-lg shrink-0"
        data-name="Button"
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5, transition: { duration: 0.1 } }}
        onClick={() => startProgrammaticScroll(() => scrollToSection("contact"))}
      >
        <Button txt="Contact" />
      </motion.div>
    </nav>
  );
}

function HeaderDesktop({ logoColor }: { logoColor: string }) {
  return (
    <header className="bg-[#DADADA] relative w-full h-[80px]" data-name="Header">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between px-16 py-6 relative size-full">
          <div 
            className="h-10 relative shrink-0 w-[70px] cursor-pointer" 
            data-name="Logo"
            onClick={() => startProgrammaticScroll(() => scrollToSection("home"))}
          >
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              role="presentation"
              viewBox="0 0 70 40"
            >
              <path
                d={svgPaths.p38276700}
                fill={logoColor}
                id="OA"
              />
            </svg>
          </div>
          <NavDesktop />
        </div>
      </div>
    </header>
  );
}

function NavTablet() {
  return (
    <nav
      className="box-border content-stretch cursor-pointer flex flex-row gap-8 items-center justify-end overflow-visible p-0 relative shrink-0"
      data-name="Nav"
    >
      <motion.div
        className="box-border content-stretch flex flex-row gap-2.5 h-[60px] items-center justify-center px-4 py-0 relative rounded-lg shrink-0"
        data-name="Button"
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5, transition: { duration: 0.1 } }}
        onClick={() => startProgrammaticScroll(() => scrollToSection("home"))}
      >
        <Button txt="Home" />
      </motion.div>
      <motion.div
        className="box-border content-stretch flex flex-row gap-2.5 h-[60px] items-center justify-center px-4 py-0 relative rounded-lg shrink-0"
        data-name="Button"
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5, transition: { duration: 0.1 } }}
        onClick={() => startProgrammaticScroll(() => scrollToSection("about"))}
      >
        <Button txt="About" />
      </motion.div>
      <motion.div
        className="box-border content-stretch flex flex-row gap-2.5 h-[60px] items-center justify-center px-4 py-0 relative rounded-lg shrink-0"
        data-name="Button"
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5, transition: { duration: 0.1 } }}
        onClick={() => startProgrammaticScroll(() => scrollToSection("work"))}
      >
        <div className="font-['Manrope:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000000] text-[24px] text-left text-nowrap">
          <p className="block leading-[normal] whitespace-pre">Work</p>
        </div>
      </motion.div>
      <motion.div
        className="box-border content-stretch flex flex-row gap-2.5 h-[60px] items-center justify-center px-4 py-0 relative rounded-lg shrink-0"
        data-name="Button"
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5, transition: { duration: 0.1 } }}
        onClick={() => startProgrammaticScroll(() => scrollToSection("contact"))}
      >
        <Button txt="Contact" />
      </motion.div>
    </nav>
  );
}

function HeaderTablet({ logoColor }: { logoColor: string }) {
  return (
    <header className="bg-[#DADADA] relative w-full h-[80px]" data-name="Header">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between px-6 py-8 relative size-full">
          <div 
            className="h-10 relative shrink-0 w-[70px] cursor-pointer" 
            data-name="Logo"
            onClick={() => startProgrammaticScroll(() => scrollToSection("hero"))}
          >
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              role="presentation"
              viewBox="0 0 70 40"
            >
              <path
                d={svgPaths.p38276700}
                fill={logoColor}
                id="OA"
              />
            </svg>
          </div>
          <NavTablet />
        </div>
      </div>
    </header>
  );
}

function HeaderMobile({ logoColor }: { logoColor: string }) {
  return (
    <header className="bg-[#DADADA] relative w-full h-[80px]" data-name="Header">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between px-6 py-8 relative size-full">
          <div
            aria-label="Website Logo"
            className="cursor-pointer h-10 relative shrink-0 w-[70px]"
            data-name="Logo"
            onClick={() => startProgrammaticScroll(() => scrollToSection("home"))}
          >
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              role="presentation"
              viewBox="0 0 70 40"
            >
              <path
                d={svgPaths.p38276700}
                fill={logoColor}
                id="OA"
              />
            </svg>
          </div>
          <div
            className="box-border content-stretch flex flex-col items-end justify-start pb-3 pt-0 px-0 relative shrink-0 w-[100px]"
            data-name="Navigation Icon"
          >
            <div
              className="box-border content-stretch flex flex-row h-6 items-center justify-between mb-[-12px] p-0 relative shrink-0 w-full cursor-pointer"
              data-name="Components / Navigation Icon/ tab"
              onClick={() => startProgrammaticScroll(() => scrollToSection("home"))}
            >
              <div className="font-['Manrope:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000000] text-[16px] text-left w-[66px]">
                <p className="block leading-[normal]">Home</p>
              </div>
              <div
                className="h-1 relative shrink-0 w-[22px]"
                data-name="Components / Navigation Icon/ line"
              >
                <div
                  className="absolute h-0 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[18px]"
                  data-name="Active"
                >
                  <div
                    className="absolute bottom-[-2px] left-[-11.111%] right-[-11.111%] top-[-2px]"
                    style={
                      {
                        "--stroke-0": "rgba(0, 0, 0, 1)",
                      } as React.CSSProperties
                    }
                  >
                    <svg
                      className="block size-full"
                      fill="none"
                      preserveAspectRatio="none"
                      role="presentation"
                      viewBox="0 0 22 4"
                    >
                      <path
                        d="M2 2L20 2"
                        id="Active"
                        stroke="var(--stroke-0, black)"
                        strokeLinecap="round"
                        strokeWidth="4"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="box-border content-stretch flex flex-row gap-[30px] h-6 items-center justify-end mb-[-12px] p-0 relative shrink-0 w-full cursor-pointer"
              data-name="Components / Navigation Icon/ tab"
              onClick={() => startProgrammaticScroll(() => scrollToSection("about"))}
            >
              <div
                className="h-1 relative shrink-0 w-[22px]"
                data-name="Components / Navigation Icon/ line"
              >
                <div
                  className="absolute h-0 right-0.5 top-1/2 translate-y-[-50%] w-2.5"
                  data-name="Active"
                >
                  <div
                    className="absolute bottom-[-2px] left-[-20%] right-[-20%] top-[-2px]"
                    style={
                      {
                        "--stroke-0": "rgba(0, 0, 0, 1)",
                      } as React.CSSProperties
                    }
                  >
                    <svg
                      className="block size-full"
                      fill="none"
                      preserveAspectRatio="none"
                      role="presentation"
                      viewBox="0 0 14 4"
                    >
                      <path
                        d="M2 2H12"
                        id="Active"
                        stroke="var(--stroke-0, black)"
                        strokeLinecap="round"
                        strokeWidth="4"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="box-border content-stretch flex flex-row gap-[30px] h-6 items-center justify-end mb-[-12px] p-0 relative shrink-0 w-full cursor-pointer"
              data-name="Components / Navigation Icon/ tab"
              onClick={() => startProgrammaticScroll(() => scrollToSection("work"))}
            >
              <div
                className="h-1 relative shrink-0 w-[22px]"
                data-name="Components / Navigation Icon/ line"
              >
                <div
                  className="absolute h-0 right-0.5 top-1/2 translate-y-[-50%] w-2.5"
                  data-name="Active"
                >
                  <div
                    className="absolute bottom-[-2px] left-[-20%] right-[-20%] top-[-2px]"
                    style={
                      {
                        "--stroke-0": "rgba(0, 0, 0, 1)",
                      } as React.CSSProperties
                    }
                  >
                    <svg
                      className="block size-full"
                      fill="none"
                      preserveAspectRatio="none"
                      role="presentation"
                      viewBox="0 0 14 4"
                    >
                      <path
                        d="M2 2H12"
                        id="Active"
                        stroke="var(--stroke-0, black)"
                        strokeLinecap="round"
                        strokeWidth="4"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="box-border content-stretch flex flex-row gap-[30px] h-6 items-center justify-end mb-[-12px] p-0 relative shrink-0 w-full cursor-pointer"
              data-name="Components / Navigation Icon/ tab"
              onClick={() => startProgrammaticScroll(() => scrollToSection("contact"))}
            >
              <div
                className="h-1 relative shrink-0 w-[22px]"
                data-name="Components / Navigation Icon/ line"
              >
                <div
                  className="absolute h-0 right-0.5 top-1/2 translate-y-[-50%] w-2.5"
                  data-name="Active"
                >
                  <div
                    className="absolute bottom-[-2px] left-[-20%] right-[-20%] top-[-2px]"
                    style={
                      {
                        "--stroke-0": "rgba(0, 0, 0, 1)",
                      } as React.CSSProperties
                    }
                  >
                    <svg
                      className="block size-full"
                      fill="none"
                      preserveAspectRatio="none"
                      role="presentation"
                      viewBox="0 0 14 4"
                    >
                      <path
                        d="M2 2H12"
                        id="Active"
                        stroke="var(--stroke-0, black)"
                        strokeLinecap="round"
                        strokeWidth="4"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Header({ scrollThreshold = 10, scrollSensitivity = 1, autoHide = true, logoColor = '#EEBA05' }) {
  const { width } = useActiveBreakpoint();
  const scrollY = useMotionValue(0);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef("none");
  const headerHeight = useRef(0);
  const [initialRender, setInitialRender] = useState(true);
  
  // Get the height of the header after initial render
  useEffect(() => {
    // A small delay to ensure the header has rendered
    const timer = setTimeout(() => {
      const headerElement = document.querySelector("[data-name='Header']");
      if (headerElement) {
        headerHeight.current = headerElement.getBoundingClientRect().height;
        setInitialRender(false);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Track scroll position and direction
  useEffect(() => {
    if (initialRender) return;
    
    const handleScroll = () => {
      if (!autoHide) {
        // Keep header visible
        scrollY.set(0);
        lastScrollY.current = window.scrollY;
        return;
      }
      
      if (isAutoScrollingState.current) {
        // Skip hiding while programmatic scroll in progress
        lastScrollY.current = window.scrollY;
        return;
      }
      
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY.current) {
        scrollDirection.current = "down";
      } else if (currentScrollY < lastScrollY.current) {
        scrollDirection.current = "up";
      }
      
      // Update motion value based on scroll direction and amount
      if (currentScrollY <= scrollThreshold) {
        // At the top of the page - fully visible
        scrollY.set(0);
      } else if (scrollDirection.current === "down") {
        // Calculate how much to hide based on scroll speed
        const scrollDelta = Math.min(
          Math.abs(currentScrollY - lastScrollY.current) * scrollSensitivity,
          headerHeight.current / 4 // Limit max movement per frame
        );
        
        // Move header up (hide)
        scrollY.set(Math.min(headerHeight.current, scrollY.get() + scrollDelta));
      } else if (scrollDirection.current === "up") {
        // Calculate how much to show based on scroll speed
        const scrollDelta = Math.min(
          Math.abs(currentScrollY - lastScrollY.current) * scrollSensitivity,
          headerHeight.current / 4 // Limit max movement per frame
        );
        
        // Move header down (show)
        scrollY.set(Math.max(0, scrollY.get() - scrollDelta));
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY, scrollThreshold, scrollSensitivity, initialRender, autoHide]);

  // Transform scrollY to translateY for the header
  const headerY = useTransform(scrollY, (value) => -value);

  const headerContent = () => {
    if (width < 800) {
      return <HeaderMobile logoColor={logoColor} />;
    }
    if (width < 1280) {
      return <HeaderTablet logoColor={logoColor} />;
    }
    return <HeaderDesktop logoColor={logoColor} />;
  };

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[80px]"
      style={{ y: headerY }}
    >
      {headerContent()}
    </motion.div>
  );
}

export default Header;

defineProperties(Header, {
  scrollThreshold: {
    label: "Scroll threshold",
    type: "number",
    defaultValue: 10,
    control: "slider",
    min: 0,
    max: 50,
    step: 1
  },
  autoHide: {
    label: "Auto hide header",
    type: "boolean",
    defaultValue: true
  },
  logoColor: {
    label: "Logo color",
    type: "string",
    defaultValue: "#EEBA05"
  },
  scrollSensitivity: {
    label: "Scroll sensitivity",
    type: "number",
    defaultValue: 1,
    control: "slider",
    min: 0.1,
    max: 3,
    step: 0.1
  }
});
