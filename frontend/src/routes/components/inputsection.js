export default function InputSection({ name, type, val, setFunc })
{
    return (
        <section>
            <input type={type} placeholder={name} value={val} onChange={e => setFunc(e.target.value)}/>
        </section>
    );
}
