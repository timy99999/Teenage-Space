import logo from '../assets/logo-ts.png';

export function Loader() {
  return (
    <div className="ts-loader">
      <div className="ts-loader-ring">
        <div className="ts-loader-glow" />
        <div className="ts-loader-spin" />
        <img src={logo} alt="Teenage Space" className="ts-loader-logo" />
      </div>
      <div className="ts-loader-dots">
        <span style={{ background: '#a9e6f5', animationDelay: '0s' }} />
        <span style={{ background: '#a9e6f5', animationDelay: '.12s' }} />
        <span style={{ background: '#8b5cf6', animationDelay: '.24s' }} />
        <span style={{ background: '#8b5cf6', animationDelay: '.36s' }} />
        <span style={{ background: '#ffffff', animationDelay: '.48s' }} />
      </div>
    </div>
  );
}
