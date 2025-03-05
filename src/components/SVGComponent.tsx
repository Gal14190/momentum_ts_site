import { ReactSVG } from "react-svg";
import classes from "./svgComponent.module.css";

type IconTargetSvgProps = {
    src: string;
    fill?: string;
    stroke?: string;
    size?: string;
    className?: string;
    responsive?: boolean
    onClick?: () => void;
};

function SVGComponent({ src, fill, stroke, size, className, responsive, onClick }: IconTargetSvgProps) {
    return (
        <ReactSVG
            onClick={onClick ? () => onClick() : undefined}
            className={`${className} ${(responsive) ? classes.svg_container : ""}`}
            src={src}
            style={responsive ? { height: "90%", width: "90%", display: "flex", alignItems: "center" } : {display: "flex", alignItems: "center", justifyContent: "center"}}
            afterInjection={(svg: { setAttribute: (arg0: string, arg1: string) => void; }) => {
                const styles = `
                    ${fill ? `fill:${fill};` : ''}
                    ${stroke ? `stroke:${stroke};` : ''}
                    ${size ? `width:${responsive ? "100%" : size}; height:${responsive ? "100%" : size};` : ''}
                `;
                svg.setAttribute("style", styles);
            }}
        />
    );
}

export default SVGComponent;
