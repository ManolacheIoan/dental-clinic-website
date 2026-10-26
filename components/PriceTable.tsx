import type { PriceItem } from "@/data/services";

export function PriceTable({ items, caption }: { items: PriceItem[]; caption: string }) {
  return (
    <div className="price-table-wrap">
      <table className="price-table">
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Serviciu</th>
            <th scope="col">Preț</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.label}>
              <th scope="row">
                {p.label}
                {p.note && <span className="price-table__note"> ({p.note})</span>}
              </th>
              <td>{p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
