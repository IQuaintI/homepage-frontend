import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function HomepageMarkdownPage({ filePath }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // ✅ This ensures proper resolution in dev & prod
    const fullPath = `${import.meta.env.BASE_URL}${filePath.startsWith('/') ? filePath.slice(1) : filePath}`;

    fetch(fullPath)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [filePath]);

  return (
    <div className="prose dark:prose-invert max-w-4xl mx-auto px-4 py-12">
      {loading && <p>Loading documentation...</p>}
      {error && (
        <p className="text-red-600">
          Failed to load content: {error}
        </p>
      )}
      {!loading && !error && (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      )}
    </div>
  );
}

export default HomepageMarkdownPage;


