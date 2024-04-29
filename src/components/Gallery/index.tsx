import { SearchMachineSendAction } from 'machines/searchMachine'
import { memo, useEffect, useRef } from 'react'
import { Image, Space } from 'antd'
import { ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons'
import { Picture } from 'actions/searchActions'
import './gallery.sass'

function GalleryComponent({
  isEmpty,
  isLoading,
  pictures,
  picturePlugs,
  sendToSearchMachine,
}: {
  isEmpty: boolean
  isLoading: boolean
  pictures: Picture[]
  picturePlugs: number[]
  sendToSearchMachine: SearchMachineSendAction
}) {
  const picturePlugRef = useRef<HTMLDivElement>(null)

  const checkPicturePlugVisibility = () => {
    if (!picturePlugRef.current) return

    const picturePlugRect = picturePlugRef.current.getBoundingClientRect()
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight

    // Если верхняя или нижняя граница заглушки видна на экране, загрузить следующую страницу
    if (
      (picturePlugRect.top <= windowHeight ||
        picturePlugRect.bottom <= windowHeight) &&
      !isLoading
    ) {
      sendToSearchMachine({ type: 'LOAD_NEXT_PAGE' })
    }
  }

  useEffect(() => {
    // Проверяем видимость заглушек при изменении списка изображений
    checkPicturePlugVisibility()
  }, [picturePlugs])

  const handleScroll = () => {
    // Проверяем, если пользователь пролистал до элемента-заглушки в конце списка
    const firstPicturePlugElement = document.getElementById('first-plug')
    if (
      firstPicturePlugElement &&
      firstPicturePlugElement.getBoundingClientRect().top <=
        window.innerHeight &&
      !isLoading
    ) {
      sendToSearchMachine({ type: 'LOAD_NEXT_PAGE' }) // Загружаем следующую страницу
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pictures])

  return (
    <div className="galleryContainer">
      {isEmpty ? (
        <p className="emptyResult">К сожалению, поиск не дал результатов</p>
      ) : (
        <div className="flexImageContainer">
          <Image.PreviewGroup
            preview={{
              toolbarRender: (
                _,
                { transform: { scale }, actions: { onZoomOut, onZoomIn } }
              ) => (
                <Space
                  size={20}
                  className="toolbar-wrapper"
                  style={{
                    background: '#000000b0',
                    padding: '9px 16px',
                    borderRadius: '20px',
                  }}
                >
                  <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                  <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                </Space>
              ),
            }}
          >
            {pictures &&
              pictures.map((picture) => (
                <Image
                  key={picture.id}
                  src={picture.urls.thumb}
                  preview={{
                    src: picture.urls.regular,
                  }}
                  loading="lazy"
                />
              ))}
          </Image.PreviewGroup>
          {picturePlugs.length > 0 &&
            picturePlugs.map((item, index) => (
              <div
                key={item}
                className="picturePlug"
                id={index === 0 ? 'first-plug' : 'plug'}
                ref={index === 0 ? picturePlugRef : null}
              >
                <div className="picturePlugImage"></div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

const Gallery = memo(GalleryComponent)

export default Gallery
