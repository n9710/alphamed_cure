import AlphaMedLoader from '@/components/AlphaMedLoader';

export default function Loading() {
  return (
    <div className="min-h-[65vh] flex items-center justify-center">
      <AlphaMedLoader
        message="Loading AlphaMed Cure catalog..."
        subtext="WHO-GMP & ISO 13485:2016 Institutional Supply Network"
        size="lg"
      />
    </div>
  );
}
