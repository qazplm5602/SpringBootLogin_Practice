export default function Input({ title, type, placeholder, value, onChange, disabled, ...props }) {
    return <div {...props} >
        <span>{title}</span>
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} />
    </div>
}