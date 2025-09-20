export default function ServiceCard({ title, description, icon }) {
  return (
    <div className="col-xl-3 col-lg-4 col-sm-6 col-12">
      <div className="single-solari-service-start">
        <div className="icon-area">{icon}</div>
        <h5 className="title">{title}</h5>
        <p className="disc">{description}</p>
      </div>
    </div>
  );
}
