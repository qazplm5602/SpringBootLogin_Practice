export default function Input({ title, type, placeholder, value, onChange, ...props }) {
    return <div {...props} >
        <span>{title}</span>
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
}