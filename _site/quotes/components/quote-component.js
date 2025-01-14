const QuoteComponent = ({ quote }) => {
  const getTitle = (tipNumber) => {
    return `Tip #${tipNumber}`;
  }

  const renderCard = ({ title, subtitle, message }) => {
    return (
      <div>
        <CardComponent title={title} subtitle={subtitle} message={message} width={1024} height={768} />
      </div>
    )
  }

  return renderCard({ title: getTitle(quote.index + 1), subtitle: quote.book, message: quote.message });
}