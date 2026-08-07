/* eslint-disable react/jsx-no-duplicate-props */
"use client";
import ScrollExpand from './ScrollExpand'

const ScrollCta = () => {
    return (
        <div>

            <ScrollExpand
                src="./hero.png"
                alt="Product hero"
                title="Built to scale"
                scrollHint="Scroll inside the frame"
                useWindowScroll
            >
                <h2>Every pixel, everywhere</h2>
                <p>The frame opens up as you scroll and hands the whole stage to your media.</p>
            </ScrollExpand>

            <div style={{ height: '520px' }}>
                <ScrollExpand src="./hero.png" title="Built to scale" mediaZoom={1.35}
                    startWidth={42}
                    startHeight={58}
                    startRadius={24}
                    endRadius={0}
                    scrollDistance={1.2}
                    holdDistance={0.35}
                    smoothing={0.1}
                    overlayScrim={0.45}
                    enabled
                />
            </div>
        </div>
    )
}

export default ScrollCta