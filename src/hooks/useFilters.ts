import Konva from "konva";

export const useFilters = (canvas: Konva.Stage | null) => {
  const applyGrayscale = () => {
    if (!canvas) return;
    canvas.getLayers().forEach((layer) => {
      if (layer instanceof Konva.Image) {
        layer.cache();
        layer.filters([Konva.Filters.Grayscale]);
        canvas.batchDraw();
      }
    });
  };

  const adjustBrightness = (value: number) => {
    if (!canvas) return;
    canvas.getLayers().forEach((layer) => {
      if (layer instanceof Konva.Image) {
        layer.cache();
        layer.filters([Konva.Filters.Brighten]);
        layer.brightness(value);
        canvas.batchDraw();
      }
    });
  };

  const applyBlur = (value: number) => {
    if (!canvas) return;
    canvas.getLayers().forEach((layer) => {
      if (layer instanceof Konva.Image) {
        layer.cache();
        layer.filters([Konva.Filters.Blur]);
        layer.blurRadius(value);
        canvas.batchDraw();
      }
    });
  };

  const applySepia = () => {
    if (!canvas) return;
    canvas.getLayers().forEach((layer) => {
      if (layer instanceof Konva.Image) {
        layer.cache();
        layer.filters([Konva.Filters.Sepia]);
        canvas.batchDraw();
      }
    });
  };

  const applyInvert = () => {
    if (!canvas) return;
    canvas.getLayers().forEach((layer) => {
      if (layer instanceof Konva.Image) {
        layer.cache();
        layer.filters([Konva.Filters.Invert]);
        canvas.batchDraw();
      }
    });
  };

  const adjustContrast = (value: number) => {
    if (!canvas) return;
    canvas.getLayers().forEach((layer) => {
      if (layer instanceof Konva.Image) {
        layer.cache();
        layer.filters([Konva.Filters.Contrast]);
        layer.contrast(value);
        canvas.batchDraw();
      }
    });
  };

  const applyPixelation = (value: number) => {
    if (!canvas) return;
    canvas.getLayers().forEach((layer) => {
      if (layer instanceof Konva.Image) {
        layer.cache();
        layer.filters([Konva.Filters.Pixelate]);
        layer.pixelSize(value);
        canvas.batchDraw();
      }
    });
  };

  const adjustHue = (value: number) => {
    if (!canvas) return;
    canvas.getLayers().forEach((layer) => {
      if (layer instanceof Konva.Image) {
        layer.cache();
        layer.filters([Konva.Filters.HSL]);
        layer.hue(value);
        canvas.batchDraw();
      }
    });
  };

  return {
    applyGrayscale,
    adjustBrightness,
    applyBlur,
    applySepia,
    applyInvert,
    adjustContrast,
    applyPixelation,
    adjustHue,
  };
};
