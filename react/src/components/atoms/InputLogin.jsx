export default function InputLogin({
  loginName,
  loginId,
  LoginPlaceholder,
  onchange,
  loginValue,
  icon,
  tipo,
}) {
  return (
    <div className="divinputlogin">
      <img src={icon} />
      <input
        type={tipo}
        name={loginName}
        id={loginId}
        placeholder={LoginPlaceholder}
        onChange={onchange}
        value={loginValue}
      />
    </div>
  );
}
